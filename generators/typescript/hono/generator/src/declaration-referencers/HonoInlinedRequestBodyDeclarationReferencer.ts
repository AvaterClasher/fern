import { RelativeFilePath } from "@fern-api/fs-utils";
import { HttpEndpoint } from "@fern-fern/ir-sdk/api";
import { ExportedFilePath, PackageId, Reference } from "@fern-typescript/commons";

import { AbstractHonoServiceDeclarationReferencer } from "./AbstractHonoServiceDeclarationReferencer";
import { DeclarationReferencer } from "./DeclarationReferencer";

export declare namespace HonoInlinedRequestBodyDeclarationReferencer {
    export interface Name {
        packageId: PackageId;
        endpoint: HttpEndpoint;
    }
}

const REQUESTS_DIRECTORY_NAME = "requests";

export class HonoInlinedRequestBodyDeclarationReferencer extends AbstractHonoServiceDeclarationReferencer<HonoInlinedRequestBodyDeclarationReferencer.Name> {
    public getExportedFilepath(name: HonoInlinedRequestBodyDeclarationReferencer.Name): ExportedFilePath {
        return {
            directories: [
                ...this.getExportedDirectory(name, {
                    subExports: {
                        [RelativeFilePath.of(REQUESTS_DIRECTORY_NAME)]: { exportAll: true }
                    }
                }),
                {
                    nameOnDisk: REQUESTS_DIRECTORY_NAME,
                    exportDeclaration: { exportAll: true }
                }
            ],
            file: {
                nameOnDisk: this.getFilename(name),
                exportDeclaration: {
                    namedExports: [this.getExportedName(name)]
                }
            }
        };
    }

    public getFilename(name: HonoInlinedRequestBodyDeclarationReferencer.Name): string {
        return `${this.getExportedName(name)}.ts`;
    }

    public getExportedName(name: HonoInlinedRequestBodyDeclarationReferencer.Name): string {
        if (name.endpoint.requestBody?.type !== "inlinedRequestBody") {
            throw new Error("Cannot get exported name for inlined request, because endpoint request is not inlined");
        }
        return name.endpoint.requestBody.name.pascalCase.unsafeName;
    }

    public getReferenceToInlinedRequestBody(
        args: DeclarationReferencer.getReferenceTo.Options<HonoInlinedRequestBodyDeclarationReferencer.Name>
    ): Reference {
        return this.getReferenceTo(this.getExportedName(args.name), args);
    }

    protected getPackageIdFromName(name: HonoInlinedRequestBodyDeclarationReferencer.Name): PackageId {
        return name.packageId;
    }
}
