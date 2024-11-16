export type ApiResponse<T = unknown> = { data: T; error?: never } | { error: string; data?: never };
