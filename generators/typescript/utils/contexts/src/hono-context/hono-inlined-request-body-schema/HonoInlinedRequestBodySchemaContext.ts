import { Name } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";

import { GeneratedHonoInlinedRequestBodySchema } from "./GeneratedHonoInlinedRequestBodySchema";

export interface HonoInlinedRequestBodySchemaContext {
    getGeneratedInlinedRequestBodySchema: (packageId: PackageId, endpointName: Name) => GeneratedHonoInlinedRequestBodySchema;
}
