import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateReservationTable1665528400682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reservation',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isNullable: false,
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'begin_datetime',
                        type: 'Date',
                        isNullable: false,
                    },
                    {
                        name: 'end_datetime',
                        type: 'Date',
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'confirmed',
                        type: 'boolean',
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: 'client_cpf',
                        length: '11',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'court_id',
                        type: 'int',
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

        await queryRunner.createForeignKey(
            'reservation',
            new TableForeignKey({
                columnNames: ['client_cpf'],
                referencedColumnNames: ['cpf'],
                referencedTableName: 'client'
            })
        )

        await queryRunner.createForeignKey(
            'reservation',
            new TableForeignKey({
                columnNames: ['court_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'court'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('reservation', 'client_cpf')
        await queryRunner.dropForeignKey('reservation', 'court_id')

        await queryRunner.dropTable('reservation');
    }

}
