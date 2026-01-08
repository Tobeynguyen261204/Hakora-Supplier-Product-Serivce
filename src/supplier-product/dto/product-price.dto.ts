import { IsString, IsNumber, IsOptional, Min, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';

/**
 * Custom validator: Listing price cannot exceed retail price
 */
@ValidatorConstraint({ name: 'isListingPriceValid', async: false })
export class IsListingPriceValidConstraint implements ValidatorConstraintInterface {
  validate(listingPrice: number, args: ValidationArguments): boolean {
    const obj = args.object as ProductPriceDto;
    return listingPrice <= obj.retailPrice;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Listing price cannot exceed retail price';
  }
}

export class ProductPriceDto {
  @IsNumber()
  @Min(0)
  @Validate(IsListingPriceValidConstraint)
  listingPrice: number;

  @IsNumber()
  @Min(0)
  retailPrice: number;

  @IsString()
  currency: string = 'VND';
}

export class UpdateProductPriceDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  listingPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  retailPrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class ProductPriceResponseDto {
  listingPrice: number;
  retailPrice: number;
  currency: string;
  profitAmount: number;
}

