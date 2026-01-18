import { Hono, type MiddlewareHandler } from "hono";
import type { CookieOptions } from "hono/utils/cookie";
import * as serializers from "../../../../serialization/index";
import type * as SeedApi from "../../../index";
export interface ImdbServiceMethods {
    /**
     * Add a movie to the database using the movies/* /... path.
     */
    createMovie(req: {
        body: SeedApi.CreateMovieRequest;
    }, res: {
        send: (responseBody: SeedApi.MovieId) => Promise<void>;
        cookie: (cookie: string, value: string, options?: CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getMovie(req: {
        params: {
            movieId: serializers.MovieId.Raw;
        };
    }, res: {
        send: (responseBody: SeedApi.Movie) => Promise<void>;
        cookie: (cookie: string, value: string, options?: CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class ImdbService {
    private readonly methods;
    private app;
    constructor(methods: ImdbServiceMethods, middleware?: MiddlewareHandler[]);
    /** Adds middleware to the Hono app for all routes. */
    addMiddleware(handler: MiddlewareHandler): this;
    /** Returns the Hono app instance with all routes configured. */
    toHono(): Hono;
}
