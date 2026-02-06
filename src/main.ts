import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Configurar prefijo global para versionamiento de API
  app.setGlobalPrefix('api/v1');

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API Sistema de Biblioteca')
    .setDescription('API REST para gestión de préstamos de libros a estudiantes')
    .setVersion('1.0')
    .addTag('Bibliotecas', 'Gestión de bibliotecas')
    .addTag('Libros', 'Gestión de libros')
    .addTag('Estudiantes', 'Gestión de estudiantes')
    .addTag('Préstamos', 'Gestión de préstamos de libros')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`📚 Documentación Swagger en: http://localhost:${port}/api/docs`);
  console.log(`🔗 Base URL de la API: http://localhost:${port}/api/v1\n`);
}
bootstrap();

