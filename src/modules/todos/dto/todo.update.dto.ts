import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class TodoUpdateDto {
    @ApiProperty({ example: false, description: 'status todo'})
    @IsNotEmpty()
    readonly fulfilled: boolean;

    @ApiProperty({ example: 'Помыть посуду', description: 'Описание задачи'})
    readonly title: string;
}
