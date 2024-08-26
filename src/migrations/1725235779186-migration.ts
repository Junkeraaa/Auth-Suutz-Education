import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725235779186 implements MigrationInterface {
    name = 'Migration1725235779186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(250) NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` varchar(250) NOT NULL, \`role\` varchar(250) NOT NULL DEFAULT 'STUDENT', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content\` (\`id\` varchar(36) NOT NULL, \`fileUrl\` varchar(255) NOT NULL, \`lessonId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, \`classroomId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`classroom\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`teacherId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`role\` varchar(250) NOT NULL DEFAULT 'TEACHER', UNIQUE INDEX \`IDX_2e44b25f34bf682a4bd602d48f\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_classrooms_classroom\` (\`studentId\` varchar(36) NOT NULL, \`classroomId\` varchar(36) NOT NULL, INDEX \`IDX_d42b239f7cdfff630e75f4027f\` (\`studentId\`), INDEX \`IDX_d6c94528fd650ce7cfcf98e235\` (\`classroomId\`), PRIMARY KEY (\`studentId\`, \`classroomId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`content\` ADD CONSTRAINT \`FK_0b349f6b8ca7f05eed39ffb956d\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_8b6d946af64cde1e7408012f6d6\` FOREIGN KEY (\`classroomId\`) REFERENCES \`classroom\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_2b3c1fa62762d7d0e828c139130\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_classrooms_classroom\` ADD CONSTRAINT \`FK_d42b239f7cdfff630e75f4027f4\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`student_classrooms_classroom\` ADD CONSTRAINT \`FK_d6c94528fd650ce7cfcf98e235a\` FOREIGN KEY (\`classroomId\`) REFERENCES \`classroom\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_classrooms_classroom\` DROP FOREIGN KEY \`FK_d6c94528fd650ce7cfcf98e235a\``);
        await queryRunner.query(`ALTER TABLE \`student_classrooms_classroom\` DROP FOREIGN KEY \`FK_d42b239f7cdfff630e75f4027f4\``);
        await queryRunner.query(`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_2b3c1fa62762d7d0e828c139130\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_8b6d946af64cde1e7408012f6d6\``);
        await queryRunner.query(`ALTER TABLE \`content\` DROP FOREIGN KEY \`FK_0b349f6b8ca7f05eed39ffb956d\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6c94528fd650ce7cfcf98e235\` ON \`student_classrooms_classroom\``);
        await queryRunner.query(`DROP INDEX \`IDX_d42b239f7cdfff630e75f4027f\` ON \`student_classrooms_classroom\``);
        await queryRunner.query(`DROP TABLE \`student_classrooms_classroom\``);
        await queryRunner.query(`DROP INDEX \`IDX_2e44b25f34bf682a4bd602d48f\` ON \`teacher\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
        await queryRunner.query(`DROP TABLE \`classroom\``);
        await queryRunner.query(`DROP TABLE \`lesson\``);
        await queryRunner.query(`DROP TABLE \`content\``);
        await queryRunner.query(`DROP TABLE \`student\``);
    }

}
