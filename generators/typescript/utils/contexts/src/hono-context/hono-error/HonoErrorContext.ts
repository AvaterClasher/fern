import { DeclaredErrorName } from "@fern-fern/ir-sdk/api";

import { GeneratedHonoError } from "./GeneratedHonoError";

export interface HonoErrorContext {
    getGeneratedHonoError: (errorName: DeclaredErrorName) => GeneratedHonoError;
    getErrorClassName: (errorName: DeclaredErrorName) => string;
}
