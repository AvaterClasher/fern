import { EndpointName, PackageId } from "@fern-typescript/commons";

import { GeneratedHonoInlinedRequestBodySchema } from "./GeneratedHonoInlinedRequestBodySchema";

export interface HonoInlinedRequestBodySchemaContext {
    getGeneratedInlinedRequestBodySchema: (packageId: PackageId, endpointName: EndpointName) => GeneratedHonoInlinedRequestBodySchema;
}
