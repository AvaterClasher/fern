import { Reference } from "@fern-typescript/commons";
import { ts } from "ts-morph";

export declare namespace HonoRegisterDeclarationReferencer {
    export interface Init {}
}

export class HonoRegisterDeclarationReferencer {
    constructor(private readonly init: HonoRegisterDeclarationReferencer.Init) {}

    public getExportedName(): string {
        return "register";
    }

    public getReferenceToRegister(): Reference {
        const name = this.getExportedName();
        return {
            getExpression: () => ts.factory.createIdentifier(name),
            getTypeNode: () => ts.factory.createTypeReferenceNode(name, undefined),
            getEntityName: () => ts.factory.createIdentifier(name)
        };
    }
}
