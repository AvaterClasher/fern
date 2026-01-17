import { ErrorName } from "@fern-fern/ir-sdk/api";

import { GeneratedHonoErrorSchema } from "./GeneratedHonoErrorSchema";

export interface HonoErrorSchemaContext {
    getGeneratedHonoErrorSchema: (errorName: ErrorName) => GeneratedHonoErrorSchema;
}
