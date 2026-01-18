import { DeclaredErrorName } from "@fern-fern/ir-sdk/api";
import { Reference, Zurg } from "@fern-typescript/commons";

import { GeneratedHonoErrorSchema } from "./GeneratedHonoErrorSchema";

export interface HonoErrorSchemaContext {
    getGeneratedHonoErrorSchema: (errorName: DeclaredErrorName) => GeneratedHonoErrorSchema | undefined;
    getSchemaOfError: (errorName: DeclaredErrorName) => Zurg.Schema;
    getReferenceToHonoErrorSchema: (errorName: DeclaredErrorName) => Reference;
}
