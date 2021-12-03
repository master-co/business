import { InputCustomValidate } from '../interfaces/input-custom-validate';

export function MaxLength(length: number): InputCustomValidate {
    return {
        message: `$field length must be shorter than ${length}`,
        validate: (value) => {
            return Array.isArray(value)
                ? value.length <= length
                : typeof value === 'string' 
                    ? value.length <= length
                    : false;
        }
    };
}