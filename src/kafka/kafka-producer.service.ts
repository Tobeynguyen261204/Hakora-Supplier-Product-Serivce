import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

export const TOPIC_INVENTORY_UPDATED = 'supplier.inventory.updated';
export const TOPIC_PRODUCT_UPDATED = 'supplier.product.updated';

export interface InventoryUpdatedPayload {
  variantId: string;
  supplierId: string;
  supplierProductId: string;
  quantity: number; // new inventorySnapshot value
}

export interface ProductUpdatedPayload {
  supplierProductId: string;
  supplierId: string;
  eventType: 'PRODUCT_INFO' | 'VARIANT_PRICE' | 'VARIANT_UPSERT';
  productInfo?: {
    name?: string;
    description?: string;
    categoryId?: string;
    tags?: string[];
    specifications?: Record<string, unknown>;
  };
  variants?: Array<{
    variantId: string;
    supplierPrice?: number;
    sku?: string;
    currency?: string;
    attributes?: Record<string, string>;
    inventorySnapshot?: number;
  }>;
}

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;
  private connected = false;

  constructor(private readonly configService: ConfigService) {
    const brokers = (this.configService.get<string>('KAFKA_BROKERS') ?? 'localhost:9093').split(',');
    const clientId = this.configService.get<string>('KAFKA_CLIENT_ID') ?? 'supplier-product-service';

    const kafka = new Kafka({ clientId, brokers });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.connected = true;
      this.logger.log('[KafkaProducerService] Connected to Kafka');
    } catch (err) {
      this.logger.warn(`[KafkaProducerService] Failed to connect — Kafka events will be skipped: ${err}`);
    }
  }

  async onModuleDestroy() {
    if (this.connected) {
      await this.producer.disconnect();
    }
  }

  async emitInventoryUpdated(payload: InventoryUpdatedPayload): Promise<void> {
    await this.emit(TOPIC_INVENTORY_UPDATED, payload.variantId, payload);
  }

  async emitProductUpdated(payload: ProductUpdatedPayload): Promise<void> {
    await this.emit(TOPIC_PRODUCT_UPDATED, payload.supplierProductId, payload);
  }

  private async emit(topic: string, key: string, value: unknown): Promise<void> {
    if (!this.connected) {
      this.logger.warn(`[KafkaProducerService] Not connected — skipping event on topic ${topic}`);
      return;
    }
    try {
      const record: ProducerRecord = {
        topic,
        messages: [{ key, value: JSON.stringify(value) }],
      };
      await this.producer.send(record);
      this.logger.debug(`[KafkaProducerService] Emitted to ${topic}: key=${key}`);
    } catch (err) {
      this.logger.error(`[KafkaProducerService] Failed to emit on topic ${topic}: ${err}`);
    }
  }
}
