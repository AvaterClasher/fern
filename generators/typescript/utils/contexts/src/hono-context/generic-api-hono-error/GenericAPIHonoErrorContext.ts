import { Reference } from "@fern-typescript/commons";

import { GeneratedGenericAPIHonoError } from "./GeneratedGenericAPIHonoError";

export interface GenericAPIHonoErrorContext {
    getReferenceToGenericAPIHonoError: () => Reference;
    getGeneratedGenericAPIHonoError: () => GeneratedGenericAPIHonoError;
}
