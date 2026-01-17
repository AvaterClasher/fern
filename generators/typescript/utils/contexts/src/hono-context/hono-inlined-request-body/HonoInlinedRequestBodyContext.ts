import { EndpointName, PackageId, Reference } from "@fern-typescript/commons";

import { GeneratedHonoInlinedRequestBody } from "./GeneratedHonoInlinedRequestBody";

export interface HonoInlinedRequestBodyContext {
    getGeneratedInlinedRequestBody: (packageId: PackageId, endpointName: EndpointName) => GeneratedHonoInlinedRequestBody;
    getReferenceToInlinedRequestBodyType: (packageId: PackageId, endpointName: EndpointName) => Reference;
}
