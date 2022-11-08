import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCourtTable1665528293629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'court',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isNullable: false,
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        length: '150',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        length: '40',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('court');
    }

}
