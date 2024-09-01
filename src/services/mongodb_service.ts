
import { ToggleEntity } from "../entities/toggle_entity"
import { MikroORM } from '@mikro-orm/mongodb'; // or any other driver package



export async function connectToDatabase() {
    const orm = await MikroORM.init({
        entities: [ToggleEntity],
        clientUrl: Bun.env.MONGODB_URL,
        allowGlobalContext: true
    });

    await orm.connect()
    return orm.em
}