import { DeclaredErrorName } from "@fern-fern/ir-sdk/api";

import { GeneratedHonoErrorSchema } from "./GeneratedHonoErrorSchema";

export interface HonoErrorSchemaContext {
    getGeneratedHonoErrorSchema: (errorName: DeclaredErrorName) => GeneratedHonoErrorSchema;
}
