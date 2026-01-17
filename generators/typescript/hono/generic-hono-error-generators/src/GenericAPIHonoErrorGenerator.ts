import { GeneratedGenericAPIHonoError } from "@fern-typescript/contexts";

import { GeneratedGenericAPIHonoErrorImpl } from "./GeneratedGenericAPIHonoErrorImpl";

export declare namespace GenericAPIHonoErrorGenerator {
    export namespace generateGenericAPIHonoError {
        export interface Args {
            errorClassName: string;
        }
    }
}

export class GenericAPIHonoErrorGenerator {
    public generateGenericAPIHonoError({
        errorClassName
    }: GenericAPIHonoErrorGenerator.generateGenericAPIHonoError.Args): GeneratedGenericAPIHonoError {
        return new GeneratedGenericAPIHonoErrorImpl({ errorClassName });
    }
}
