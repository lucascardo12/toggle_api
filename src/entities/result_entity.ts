import { StatusResultEnum } from './status_result_enum';

export class ResultEntity {
    status: StatusResultEnum;
    message?: string;
    total: number;
    data: any[];

    constructor({ status, message, total, data }: { status: StatusResultEnum; message?: string; total: number; data: any[]; }) {
        this.status = status;
        this.message = message;
        this.total = total;
        this.data = data;
    }
}
