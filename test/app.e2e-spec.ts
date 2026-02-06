import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Estudiantes (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Configurar igual que en main.ts
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/estudiantes/register', () => {
    it('debe registrar un estudiante exitosamente con datos completos', () => {
      const timestamp = Date.now();
      const estudianteDto = {
        nombres: 'Juan Carlos',
        apellidos: 'Pérez García',
        email: `juan.perez.${timestamp}@universidad.edu`,
        telefono: '555-5678',
        numeroIdentificacion: `1234${timestamp}`,
        carrera: 'Ingeniería de Sistemas',
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nombres).toBe(estudianteDto.nombres);
          expect(res.body.apellidos).toBe(estudianteDto.apellidos);
          expect(res.body.email).toBe(estudianteDto.email);
          expect(res.body.numeroIdentificacion).toBe(estudianteDto.numeroIdentificacion);
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
        });
    });

    it('debe registrar un estudiante con solo campos requeridos', () => {
      const timestamp = Date.now();
      const estudianteDto = {
        nombres: 'María',
        apellidos: 'González',
        email: `maria.gonzalez.${timestamp}@universidad.edu`,
        numeroIdentificacion: `8765${timestamp}`,
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nombres).toBe(estudianteDto.nombres);
          expect(res.body.apellidos).toBe(estudianteDto.apellidos);
          expect(res.body.email).toBe(estudianteDto.email);
        });
    });

    it('debe fallar si falta el campo nombres', () => {
      const estudianteDto = {
        apellidos: 'López',
        email: 'test@universidad.edu',
        numeroIdentificacion: '11111111',
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(400);
    });

    it('debe fallar si falta el campo apellidos', () => {
      const estudianteDto = {
        nombres: 'Pedro',
        email: 'pedro@universidad.edu',
        numeroIdentificacion: '22222222',
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(400);
    });

    it('debe fallar si falta el email', () => {
      const estudianteDto = {
        nombres: 'Ana',
        apellidos: 'Martínez',
        numeroIdentificacion: '33333333',
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(400);
    });

    it('debe fallar si el email es inválido', () => {
      const timestamp = Date.now();
      const estudianteDto = {
        nombres: 'Luis',
        apellidos: 'Ramírez',
        email: 'email-invalido',
        numeroIdentificacion: `4444${timestamp}`,
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(400)
        .expect((res) => {
          expect(Array.isArray(res.body.message) ? res.body.message.join(' ') : res.body.message).toContain('email');
        });
    });

    it('debe fallar si falta el número de identificación', () => {
      const estudianteDto = {
        nombres: 'Carlos',
        apellidos: 'Sánchez',
        email: 'carlos@universidad.edu',
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(400);
    });

    it('debe fallar si el número de identificación ya existe', async () => {
      const timestamp = Date.now();
      const estudianteDto = {
        nombres: 'Roberto',
        apellidos: 'Torres',
        email: `roberto.torres.${timestamp}@universidad.edu`,
        numeroIdentificacion: `9999${timestamp}`,
      };

      // Registrar el primer estudiante
      await request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(201);

      // Intentar registrar con el mismo número de identificación
      const estudianteDuplicado = {
        nombres: 'Otro',
        apellidos: 'Estudiante',
        email: `otro.${timestamp}@universidad.edu`,
        numeroIdentificacion: `9999${timestamp}`, // Mismo número
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDuplicado)
        .expect(409);
    });

    it('debe fallar si el email ya existe', async () => {
      const timestamp = Date.now();
      const estudianteDto = {
        nombres: 'Sofia',
        apellidos: 'Vargas',
        email: `sofia.vargas.${timestamp}@universidad.edu`,
        numeroIdentificacion: `8888${timestamp}`,
      };

      // Registrar el primer estudiante
      await request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(201);

      // Intentar registrar con el mismo email
      const estudianteDuplicado = {
        nombres: 'Otra',
        apellidos: 'Persona',
        email: `sofia.vargas.${timestamp}@universidad.edu`, // Mismo email
        numeroIdentificacion: `7777${timestamp}`,
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDuplicado)
        .expect(409);
    });

    it('debe fallar si los nombres son muy cortos', () => {
      const estudianteDto = {
        nombres: 'A',
        apellidos: 'García',
        email: 'a.garcia@universidad.edu',
        numeroIdentificacion: '66666666',
      };

      return request(app.getHttpServer())
        .post('/api/v1/estudiantes/register')
        .send(estudianteDto)
        .expect(400);
    });
  });
});
