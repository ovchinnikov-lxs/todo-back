import { ApiProperty } from '@nestjs/swagger';

export class TodoCreateDto {
    @ApiProperty({ example: false, description: 'status todo'})
    readonly fulfilled: boolean;

    @ApiProperty({ example: 'Помыть посуду', description: 'Описание задачи'})
    readonly title: string;
}
