import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1770397117455 implements MigrationInterface {
    name = 'InitialSchema1770397117455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "estudiantes" ("id" SERIAL NOT NULL, "nombres" character varying(100) NOT NULL, "apellidos" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "telefono" character varying(20), "numero_identificacion" character varying(20) NOT NULL, "carrera" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b767beee87e69367827f4d23f75" UNIQUE ("email"), CONSTRAINT "UQ_9fd7b3e7edf7ef13c981664d354" UNIQUE ("numero_identificacion"), CONSTRAINT "PK_34e9c0289e8e3f437ec6c902f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bibliotecas" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "direccion" character varying(255) NOT NULL, "telefono" character varying(20), "email" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e364f07b5b144f1501fabf88f84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."libros_estado_enum" AS ENUM('DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'PERDIDO')`);
        await queryRunner.query(`CREATE TABLE "libros" ("id" SERIAL NOT NULL, "titulo" character varying(255) NOT NULL, "autor" character varying(100) NOT NULL, "isbn" character varying(20) NOT NULL, "editorial" character varying(100), "anio_publicacion" integer, "estado" "public"."libros_estado_enum" NOT NULL DEFAULT 'DISPONIBLE', "biblioteca_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1f65a5cca0c97aaaa54b0c83573" UNIQUE ("isbn"), CONSTRAINT "PK_63bdc208aaf1ed7e4df6dba27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prestamos_detalle" ("id" SERIAL NOT NULL, "prestamo_id" integer NOT NULL, "libro_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d6833744b977fa05abaa59f52c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."prestamos_estado_enum" AS ENUM('ACTIVO', 'DEVUELTO', 'VENCIDO')`);
        await queryRunner.query(`CREATE TABLE "prestamos" ("id" SERIAL NOT NULL, "estudiante_id" integer NOT NULL, "fecha_prestamo" TIMESTAMP NOT NULL, "fecha_devolucion_esperada" TIMESTAMP NOT NULL, "fecha_devolucion_real" TIMESTAMP, "estado" "public"."prestamos_estado_enum" NOT NULL DEFAULT 'ACTIVO', "observaciones" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a2a5a8ed68438a02780b16c5b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "libros" ADD CONSTRAINT "FK_3d6633db14ebf769754741a57bc" FOREIGN KEY ("biblioteca_id") REFERENCES "bibliotecas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prestamos_detalle" ADD CONSTRAINT "FK_51706811f24f3b0c47fe2791d65" FOREIGN KEY ("prestamo_id") REFERENCES "prestamos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prestamos_detalle" ADD CONSTRAINT "FK_7ffba506075c8abb8ffc05430b2" FOREIGN KEY ("libro_id") REFERENCES "libros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prestamos" ADD CONSTRAINT "FK_22754b47832836e07ed5d7c12b4" FOREIGN KEY ("estudiante_id") REFERENCES "estudiantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamos" DROP CONSTRAINT "FK_22754b47832836e07ed5d7c12b4"`);
        await queryRunner.query(`ALTER TABLE "prestamos_detalle" DROP CONSTRAINT "FK_7ffba506075c8abb8ffc05430b2"`);
        await queryRunner.query(`ALTER TABLE "prestamos_detalle" DROP CONSTRAINT "FK_51706811f24f3b0c47fe2791d65"`);
        await queryRunner.query(`ALTER TABLE "libros" DROP CONSTRAINT "FK_3d6633db14ebf769754741a57bc"`);
        await queryRunner.query(`DROP TABLE "prestamos"`);
        await queryRunner.query(`DROP TYPE "public"."prestamos_estado_enum"`);
        await queryRunner.query(`DROP TABLE "prestamos_detalle"`);
        await queryRunner.query(`DROP TABLE "libros"`);
        await queryRunner.query(`DROP TYPE "public"."libros_estado_enum"`);
        await queryRunner.query(`DROP TABLE "bibliotecas"`);
        await queryRunner.query(`DROP TABLE "estudiantes"`);
    }

}
