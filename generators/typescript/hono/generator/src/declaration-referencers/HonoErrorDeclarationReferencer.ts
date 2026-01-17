import { Reference } from "@fern-typescript/commons";
import { ErrorDeclaration, ErrorId } from "@fern-fern/ir-sdk/api";
import { ts } from "ts-morph";

export declare namespace HonoErrorDeclarationReferencer {
    export interface Init {}
}

export class HonoErrorDeclarationReferencer {
    constructor(private readonly init: HonoErrorDeclarationReferencer.Init) {}

    public getExportedName(errorId: ErrorId): string {
        return "HonoError";
    }

    public getReferenceToError(args: { error: ErrorDeclaration; errorId: ErrorId }): Reference {
        const name = this.getExportedName(args.errorId);
        return {
            getExpression: () => ts.factory.createIdentifier(name),
            getTypeNode: () => ts.factory.createTypeReferenceNode(name, undefined),
            getEntityName: () => ts.factory.createIdentifier(name)
        };
    }
}
