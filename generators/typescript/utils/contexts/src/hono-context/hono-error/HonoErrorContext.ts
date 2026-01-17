import { ErrorName } from "@fern-fern/ir-sdk/api";

import { GeneratedHonoError } from "./GeneratedHonoError";

export interface HonoErrorContext {
    getGeneratedHonoError: (errorName: ErrorName) => GeneratedHonoError;
    getErrorClassName: (errorName: ErrorName) => string;
}
