import { PackageId, Reference } from "@fern-typescript/commons";

import { GeneratedHonoService } from "./GeneratedHonoService";

export interface HonoServiceContext {
    getGeneratedHonoService: (packageId: PackageId) => GeneratedHonoService;
    getReferenceToHonoService: (packageId: PackageId, options: { importAlias: string }) => Reference;
}
