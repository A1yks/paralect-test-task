import express from 'express';

declare global {
    namespace Server {
        export type ResponseBody<T = unknown> = { data: T; error?: never } | { error: string; data?: never };

        export interface Request<Body = unknown, Params = unknown, QueryParams = unknown>
            extends express.Request<Params, unknown, unknown, QueryParams> {
            body: Body;
        }

        export type Response<T = unknown> = express.Response<ResponseBody<T>>;
    }
}

export {};
