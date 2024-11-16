import { AxiosError } from 'axios';
import { ApiResponse } from './types';

function isApiResponse(x: unknown): x is ApiResponse {
    return typeof x === 'object' && x !== null && ('data' in x || 'error' in x);
}

export function request<Cb extends (...args: Parameters<Cb>) => ReturnType<Cb>>(callback: Cb) {
    type ReturnValue = Cb extends (...args: Parameters<Cb>) => Promise<ApiResponse<infer R>> ? R : void;

    return (async (...args: Parameters<Cb>) => {
        try {
            const result = await callback(...args);

            if (isApiResponse(result)) {
                if (result.error !== undefined) {
                    throw new Error(result.error);
                }

                return result.data;
            }

            return result;
        } catch (err) {
            let message = 'Произошла непредвиденная ошибка';

            if (typeof err === 'string') {
                message = err;
            }

            if (err instanceof Error) {
                message = err.message;
            }

            if (err instanceof AxiosError) {
                message = err.response?.data?.[0]?.errors?.issues?.[0]?.message || err.message;
            }

            throw new Error(message);
        }
    }) as (...args: Parameters<Cb>) => Promise<ReturnValue extends void ? Awaited<ReturnType<Cb>> : ReturnValue>;
}
