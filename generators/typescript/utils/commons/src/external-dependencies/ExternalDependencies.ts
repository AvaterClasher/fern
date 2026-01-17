import { Blob_ } from "./blob";
import { Express } from "./express/Express";
import { Fs } from "./fs";
import { Hono } from "./hono/Hono";
import { Stream } from "./stream";

export interface ExternalDependencies {
    express: Express;
    hono: Hono;
    fs: Fs;
    blob: Blob_;
    stream: Stream;
}
