import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidationException extends HttpException {
    messages;

    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response
    }
}

@Injectable()
export class ValidateInputPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.reduce((acc, currentError) => ({
                ...acc,
                [currentError.property]: Object.keys(currentError.constraints).reduce((accField, cur) => ({
                    ...accField,
                    [cur]: {
                        msg: currentError.constraints[cur],
                        value: 'add value from validation',
                    }
                }), {}),
            }), {});
            throw new ValidationException(messages)
        }
        return value;
    }
}
