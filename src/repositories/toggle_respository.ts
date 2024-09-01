
import { connectToDatabase } from "../services/mongodb_service";
import { ToggleEntity } from "../entities/toggle_entity";
import { ObjectId, type MongoEntityManager } from "@mikro-orm/mongodb";

export class ToggleRepository {
    private datasource: Promise<MongoEntityManager>;

    constructor() {
        this.datasource = connectToDatabase();
    }

    findAll = async (): Promise<ToggleEntity[]> => {
        return (await this.getRepository()).findAll()
    }

    findByName = async (name: string): Promise<ToggleEntity[]> => {
        return (await this.getRepository()).find({ name: name })
    }
    save = async (object: ToggleEntity): Promise<ToggleEntity> => {
        return (await this.getRepository()).upsert(object)
    }
    create = async (object: ToggleEntity): Promise<string | ObjectId | null> => {
        return (await this.getRepository()).insert(object)
    }
    findById = async (id: string): Promise<ToggleEntity | null> => {
        return (await (await this.getRepository()).findOne({ _id: new ObjectId(id) }))
    }
    private getRepository = async () => {
        return (await this.datasource).getRepository(ToggleEntity);
    }

}