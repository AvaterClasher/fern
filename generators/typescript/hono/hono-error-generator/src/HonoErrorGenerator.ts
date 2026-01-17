import { ErrorDeclaration } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoError } from "@fern-typescript/contexts";

import { GeneratedHonoErrorImpl } from "./GeneratedHonoErrorImpl";

export declare namespace HonoErrorGenerator {
    export interface Init {
        includeSerdeLayer: boolean;
    }

    export namespace generateError {
        export interface Args {
            errorClassName: string;
            errorDeclaration: ErrorDeclaration;
        }
    }
}

export class HonoErrorGenerator {
    private includeSerdeLayer: boolean;

    constructor({ includeSerdeLayer }: HonoErrorGenerator.Init) {
        this.includeSerdeLayer = includeSerdeLayer;
    }

    public generateError({
        errorClassName,
        errorDeclaration
    }: HonoErrorGenerator.generateError.Args): GeneratedHonoError {
        return new GeneratedHonoErrorImpl({
            errorClassName,
            errorDeclaration
        });
    }
}
