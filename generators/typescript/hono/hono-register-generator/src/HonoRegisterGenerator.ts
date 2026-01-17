import { IntermediateRepresentation } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoRegister } from "@fern-typescript/contexts";
import { PackageResolver } from "@fern-typescript/resolvers";

import { GeneratedHonoRegisterImpl } from "./GeneratedHonoRegisterImpl";

export declare namespace HonoRegisterGenerator {
    export interface Init {
        packageResolver: PackageResolver;
        intermediateRepresentation: IntermediateRepresentation;
        registerFunctionName: string;
        areImplementationsOptional: boolean;
    }
}

export class HonoRegisterGenerator {
    private packageResolver: PackageResolver;
    private intermediateRepresentation: IntermediateRepresentation;
    private registerFunctionName: string;
    private areImplementationsOptional: boolean;

    constructor({
        packageResolver,
        intermediateRepresentation,
        registerFunctionName,
        areImplementationsOptional
    }: HonoRegisterGenerator.Init) {
        this.packageResolver = packageResolver;
        this.intermediateRepresentation = intermediateRepresentation;
        this.registerFunctionName = registerFunctionName;
        this.areImplementationsOptional = areImplementationsOptional;
    }

    public generateRegister(): GeneratedHonoRegister {
        return new GeneratedHonoRegisterImpl({
            packageResolver: this.packageResolver,
            intermediateRepresentation: this.intermediateRepresentation,
            registerFunctionName: this.registerFunctionName,
            areImplementationsOptional: this.areImplementationsOptional
        });
    }
}
