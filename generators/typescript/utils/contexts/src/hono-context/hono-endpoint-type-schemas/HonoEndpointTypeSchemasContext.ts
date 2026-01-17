import { EndpointName, PackageId } from "@fern-typescript/commons";

import { GeneratedHonoEndpointTypeSchemas } from "./GeneratedHonoEndpointTypeSchemas";

export interface HonoEndpointTypeSchemasContext {
    getGeneratedEndpointTypeSchemas: (packageId: PackageId, endpointName: EndpointName) => GeneratedHonoEndpointTypeSchemas;
}
