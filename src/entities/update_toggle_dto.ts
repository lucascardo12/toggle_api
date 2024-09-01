import type { StatusToggleEnum } from "./status_toggle_enum";

export class UpdateToggleDto {
    status: StatusToggleEnum;
    description: string;
    value: any;

    constructor(status: StatusToggleEnum, description: string, value: any) {
        this.status = status;
        this.description = description;
        this.value = value;
    }
}