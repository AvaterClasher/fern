import { AbstractHonoErrorDeclarationReferencer } from "./AbstractHonoErrorDeclarationReferencer";

export class GenericAPIHonoErrorDeclarationReferencer extends AbstractHonoErrorDeclarationReferencer {
    public getExportedName(): string {
        return `${this.namespaceExport}Error`;
    }
}
