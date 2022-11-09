import { MigrationInterface, QueryRunner } from "typeorm";

export class newMigration1668029212966 implements MigrationInterface {
    name = 'newMigration1668029212966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createAt"`);
    }

}
