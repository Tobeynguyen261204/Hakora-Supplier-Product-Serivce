import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestException } from "@nestjs/common";

export async function validateDto<T extends object>(dtoClass: new () => T, data: any): Promise<T> {
    const dtoInstance = plainToInstance(dtoClass, data);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
        const messages = errors.map((error) => {
            return Object.values(error.constraints || {}).join(', ');
        });
        throw new BadRequestException(`Validation failed: ${messages.join('; ')}`);
    }

    return dtoInstance;
}