import { MigrationInterface, QueryRunner } from "typeorm";

export class newMigration1668011863450 implements MigrationInterface {
    name = 'newMigration1668011863450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createAt"`);
    }

}
