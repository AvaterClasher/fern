import type { Hono } from "hono";
import type { ImdbService } from "./api/resources/imdb/service/ImdbService";
export declare function register(honoApp: Hono, services: {
    imdb: ImdbService;
}): void;
