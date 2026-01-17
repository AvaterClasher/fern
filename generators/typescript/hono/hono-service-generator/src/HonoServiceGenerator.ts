import { HttpService } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoService } from "@fern-typescript/contexts";
import { PackageResolver } from "@fern-typescript/resolvers";

import { GeneratedHonoServiceImpl } from "./GeneratedHonoServiceImpl";

export declare namespace HonoServiceGenerator {
    export interface Init {
        doNotHandleUnrecognizedErrors: boolean;
        packageResolver: PackageResolver;
        includeSerdeLayer: boolean;
        skipRequestValidation: boolean;
        skipResponseValidation: boolean;
        requestValidationStatusCode: number;
    }

    export namespace generateService {
        export interface Args {
            packageId: PackageId;
            service: HttpService;
            serviceClassName: string;
        }
    }
}

export class HonoServiceGenerator {
    private doNotHandleUnrecognizedErrors: boolean;
    private packageResolver: PackageResolver;
    private includeSerdeLayer: boolean;
    private skipRequestValidation: boolean;
    private skipResponseValidation: boolean;
    private requestValidationStatusCode: number;

    constructor({
        packageResolver,
        doNotHandleUnrecognizedErrors,
        includeSerdeLayer,
        skipRequestValidation,
        skipResponseValidation,
        requestValidationStatusCode
    }: HonoServiceGenerator.Init) {
        this.doNotHandleUnrecognizedErrors = doNotHandleUnrecognizedErrors;
        this.packageResolver = packageResolver;
        this.includeSerdeLayer = includeSerdeLayer;
        this.skipRequestValidation = skipRequestValidation;
        this.skipResponseValidation = skipResponseValidation;
        this.requestValidationStatusCode = requestValidationStatusCode;
    }

    public generateService({
        packageId,
        service,
        serviceClassName
    }: HonoServiceGenerator.generateService.Args): GeneratedHonoService {
        const package_ = this.packageResolver.resolvePackage(packageId);
        return new GeneratedHonoServiceImpl({
            packageId,
            package: package_,
            service,
            serviceClassName,
            doNotHandleUnrecognizedErrors: this.doNotHandleUnrecognizedErrors,
            includeSerdeLayer: this.includeSerdeLayer,
            skipRequestValidation: this.skipRequestValidation,
            skipResponseValidation: this.skipResponseValidation,
            requestValidationStatusCode: this.requestValidationStatusCode
        });
    }
}
