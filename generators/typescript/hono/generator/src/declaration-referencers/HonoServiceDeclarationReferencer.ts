import { Reference } from "@fern-typescript/commons";
import { HttpService, ServiceId } from "@fern-fern/ir-sdk/api";
import { ts } from "ts-morph";

export declare namespace HonoServiceDeclarationReferencer {
    export interface Init {}
}

export class HonoServiceDeclarationReferencer {
    constructor(private readonly init: HonoServiceDeclarationReferencer.Init) {}

    public getExportedName(serviceId: ServiceId): string {
        return "HonoService";
    }

    public getReferenceToService(args: { service: HttpService; serviceId: ServiceId }): Reference {
        const name = this.getExportedName(args.serviceId);
        return {
            getExpression: () => ts.factory.createIdentifier(name),
            getTypeNode: () => ts.factory.createTypeReferenceNode(name, undefined),
            getEntityName: () => ts.factory.createIdentifier(name)
        };
    }
}
