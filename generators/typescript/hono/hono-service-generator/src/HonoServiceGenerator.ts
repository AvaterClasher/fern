import { HttpService } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoService } from "./GeneratedHonoService";

export declare namespace HonoServiceGenerator {
    export interface Init {
        service: HttpService;
    }
}

export class HonoServiceGenerator {
    constructor(private readonly init: HonoServiceGenerator.Init) {}

    public doGenerate(): GeneratedHonoService {
        return {
            writeToFile: () => {
                // Stub implementation
            }
        };
    }
}
