import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ArchiveProductDto {
    @ApiProperty({ description: 'The ID of the product to archive' })
    @IsString()
    productId: string;

    @ApiProperty({ description: 'The reason for archiving the product' })
    @IsOptional()
    @IsString()
    reason?: string = 'Archived by supplier';
}