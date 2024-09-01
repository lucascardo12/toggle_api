import { BaseEntity, Entity, Enum, ObjectId, PrimaryKey, Property } from '@mikro-orm/mongodb';
import { StatusToggleEnum } from './status_toggle_enum';


@Entity({ tableName: "ToggleConfig" })
export class ToggleEntity extends BaseEntity {
    @PrimaryKey()
    _id: ObjectId | null;
    @Property()
    name: string;
    @Property()
    updateAt: number;
    @Enum(() => StatusToggleEnum)
    status: StatusToggleEnum;
    @Property()
    description: string;
    @Property()
    value: any;

    constructor(id: ObjectId | null = null, name: string, updateAt: number, status: StatusToggleEnum, description: string, value: any) {
        super();
        this._id = id;
        this.name = name;
        this.updateAt = updateAt;
        this.status = status;
        this.description = description;
        this.value = value;
    }

    public copyWith(status?: StatusToggleEnum, description?: string, value?: any): ToggleEntity {
        return new ToggleEntity(
            this._id!,
            this.name,
            this.updateAt,
            status ?? this.status,
            description ?? this.description,
            value ?? this.value
        )
    }
}

