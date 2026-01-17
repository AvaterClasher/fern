import { ErrorDeclaration } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoError, HonoContext } from "@fern-typescript/contexts";

export declare namespace GeneratedHonoErrorImpl {
    export interface Init {
        errorDeclaration: ErrorDeclaration;
        errorClassName: string;
    }
}

export class GeneratedHonoErrorImpl implements GeneratedHonoError {
    private errorClassName: string;
    private errorDeclaration: ErrorDeclaration;

    constructor({ errorClassName, errorDeclaration }: GeneratedHonoErrorImpl.Init) {
        this.errorClassName = errorClassName;
        this.errorDeclaration = errorDeclaration;
    }

    public writeToFile(context: HonoContext): void {
        // Stub: Generate basic error class
        context.sourceFile.addClass({
            name: this.errorClassName,
            isExported: true,
            extends: "Error",
            ctors: [
                {
                    parameters: [
                        {
                            name: "message",
                            type: "string"
                        }
                    ],
                    statements: ["super(message);"]
                }
            ]
        });
    }
}
