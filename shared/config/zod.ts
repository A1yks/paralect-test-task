import { z, ZodIssueCode } from 'zod';

z.setErrorMap((issue, ctx) => {
    if (ctx.defaultError === 'Required')
        return {
            message: 'Это поле является обязательным',
        };

    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.expected === 'number') {
                return { message: `Ожидается числовое значение` };
            }

            if (issue.expected === 'string') {
                return { message: `Ожидается строковое значение` };
            }

            if (issue.received === 'undefined') {
                return { message: 'Это поле является обязательным' };
            }
            return {
                message: `Ожидался тип ${issue.expected}, но получен ${issue.received}`,
            };
        case ZodIssueCode.invalid_literal:
            return {
                message: `Значение должно быть ${JSON.stringify(issue.expected)}`,
            };
        case ZodIssueCode.unrecognized_keys:
            return {
                message: `Обнаружены нераспознанные ключи: ${issue.keys.join(', ')}`,
            };
        case ZodIssueCode.invalid_union:
        case ZodIssueCode.invalid_union_discriminator:
            return {
                message: 'Значение не соответствует ни одному из ожидаемых вариантов',
            };
        case ZodIssueCode.invalid_enum_value:
            return {
                message: `Неправильное значение. Допустимые значения: ${issue.options.join(', ')}`,
            };
        case ZodIssueCode.too_small:
            if (issue.type === 'string') {
                return { message: `Строка слишком короткая. Минимальная длина: ${issue.minimum}` };
            } else if (issue.type === 'number') {
                return { message: `Число слишком маленькое. Минимальное значение: ${issue.minimum}` };
            }
            return { message: `Значение слишком маленькое` };
        case ZodIssueCode.too_big:
            if (issue.type === 'string') {
                return { message: `Строка слишком длинная. Максимальная длина: ${issue.maximum}` };
            } else if (issue.type === 'number') {
                return { message: `Число слишком большое. Максимальное значение: ${issue.maximum}` };
            }
            return { message: `Значение слишком большое` };
        case ZodIssueCode.custom:
            return { message: issue.message ?? 'Некорректное значение' };
        case ZodIssueCode.invalid_date:
            return { message: 'Невалидная дата' };
        case ZodIssueCode.not_finite:
            return { message: 'Значение должно быть конечным числом' };
        default:
            return { message: ctx.defaultError };
    }
});
