export class CreateToggleDto {
    name: string;
    description: string;
    value: any;

    constructor(name: string, description: string, value: any) {
        this.name = name;
        this.description = description;
        this.value = value;
    }
}