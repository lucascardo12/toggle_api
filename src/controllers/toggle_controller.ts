import type { CreateToggleDto } from "../entities/create_toggle_dto";
import { ResultEntity } from "../entities/result_entity";
import { StatusResultEnum } from "../entities/status_result_enum";
import { StatusToggleEnum } from "../entities/status_toggle_enum";
import { ToggleEntity } from "../entities/toggle_entity";
import type { UpdateToggleDto } from "../entities/update_toggle_dto";
import { ToggleRepository } from "../repositories/toggle_respository";


export class ToggleController {
    private repository: ToggleRepository;

    constructor() {
        this.repository = new ToggleRepository();
    }

    list = async (name?: string): Promise<ResultEntity> => {
        console.log(name)
        const values = name ? await this.repository.findByName(name) : await this.repository.findAll();
        return new ResultEntity({
            total: values.length,
            status: StatusResultEnum.SUCCESS,
            data: values,
            message: "Listado com sucesso"
        });
    };

    update = async (body: UpdateToggleDto, id: string): Promise<ResultEntity> => {
        const find = await this.repository.findById(id)
        if (!find) {
            throw new Error('note found')
        }
        const result = await this.repository.save(find.copyWith(body.status, body.description, body.value));
        return new ResultEntity({
            total: 1,
            status: StatusResultEnum.SUCCESS,
            data: [result],
            message: `Toggle salvo com sucesso Id: ${result} `
        });

    };

    create = async (body: CreateToggleDto): Promise<ResultEntity> => {
        const find = await this.repository.findByName(body.name)
        if (find.length > 0) {
            throw new Error('Toggle ja existe com esse nome')
        }
        const toggle = new ToggleEntity(
            null,
            body.name,
            Date.now(),
            StatusToggleEnum.DISABLE,
            body.description,
            body.value
        )
        const result = await this.repository.create(toggle);
        if (!result) {
            throw new Error('Erro ao criar o toggle')
        }
        return new ResultEntity({
            total: 1,
            status: StatusResultEnum.SUCCESS,
            data: [toggle],
            message: `Toggle criado com sucesso Id: ${result} `
        });

    };
}






