import { HttpService, ServiceId } from "@fern-fern/ir-sdk/api";
import { ExportedFilePath, PackageId, Reference } from "@fern-typescript/commons";

import { AbstractHonoServiceDeclarationReferencer } from "./AbstractHonoServiceDeclarationReferencer";
import { DeclarationReferencer } from "./DeclarationReferencer";

export declare namespace HonoServiceDeclarationReferencer {
    export interface Init extends AbstractHonoServiceDeclarationReferencer.Init {}
}

export class HonoServiceDeclarationReferencer extends AbstractHonoServiceDeclarationReferencer<{
    serviceId: ServiceId;
    service: HttpService;
}> {
    constructor(init: HonoServiceDeclarationReferencer.Init) {
        super(init);
    }

    public getExportedFilepath(name: { serviceId: ServiceId; service: HttpService }): ExportedFilePath {
        return {
            directories: [...this.getExportedDirectory(name)],
            file: {
                nameOnDisk: this.getFilename(name)
            }
        };
    }

    public getFilename(name: { serviceId: ServiceId; service: HttpService }): string {
        return `${this.getExportedNameOfService(name)}.ts`;
    }

    public getExportedNameOfService(name: { serviceId: ServiceId; service: HttpService }): string {
        return `${name.service.name.pascalCase.safeName}Service`;
    }

    public getReferenceToService(args: DeclarationReferencer.getReferenceTo.Options<{
        serviceId: ServiceId;
        service: HttpService;
    }>): Reference {
        return this.getReferenceTo(this.getExportedNameOfService(args.name), args);
    }

    protected getPackageIdFromName(name: { serviceId: ServiceId; service: HttpService }): PackageId {
        return name.service.name.fernFilepath.packagePath;
    }
}
