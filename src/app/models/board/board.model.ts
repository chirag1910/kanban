import { Column } from "../column/column.model";

export class Board {
    name: string = "";
    createdOn: Date = new Date();
    columns: Column[] = [];
}
