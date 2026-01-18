import { HonoRegisterContext, GeneratedHonoRegister } from "@fern-typescript/contexts";
import { HonoRegisterGenerator } from "@fern-typescript/hono-register-generator";

export declare namespace HonoRegisterContextImpl {
    export interface Init {
        honoRegisterGenerator: HonoRegisterGenerator;
    }
}

export class HonoRegisterContextImpl implements HonoRegisterContext {
    private honoRegisterGenerator: HonoRegisterGenerator;

    constructor({ honoRegisterGenerator }: HonoRegisterContextImpl.Init) {
        this.honoRegisterGenerator = honoRegisterGenerator;
    }

    public getGeneratedHonoRegister(): GeneratedHonoRegister | undefined {
        return this.honoRegisterGenerator.generateRegister();
    }
}
