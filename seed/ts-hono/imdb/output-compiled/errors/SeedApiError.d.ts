import type { Context } from "hono";
export declare abstract class SeedApiError extends Error {
    readonly errorName?: string | undefined;
    constructor(errorName?: string | undefined);
    abstract toResponse(c: Context): Response;
}
