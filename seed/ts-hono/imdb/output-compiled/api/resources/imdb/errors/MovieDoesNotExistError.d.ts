import type { Context } from "hono";
import * as errors from "../../../../errors/index";
import type * as SeedApi from "../../../index";
export declare class MovieDoesNotExistError extends errors.SeedApiError {
    private readonly body;
    constructor(body: SeedApi.MovieId);
    toResponse(c: Context): Response;
}
