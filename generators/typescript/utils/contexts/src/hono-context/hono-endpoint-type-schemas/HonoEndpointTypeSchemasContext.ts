import { Name } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";

import { GeneratedHonoEndpointTypeSchemas } from "./GeneratedHonoEndpointTypeSchemas";

export interface HonoEndpointTypeSchemasContext {
    getGeneratedEndpointTypeSchemas: (packageId: PackageId, endpointName: Name) => GeneratedHonoEndpointTypeSchemas;
}
