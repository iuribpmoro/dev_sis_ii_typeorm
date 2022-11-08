import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateClientsTable1665528057306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'client',
                columns: [
                    {
                        name: 'cpf',
                        length: '11',
                        type: 'varchar',
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        length: '150',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'phone',
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
        await queryRunner.dropTable('client');
    }

}
