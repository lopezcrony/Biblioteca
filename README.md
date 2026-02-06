# 📚 Sistema de Gestión de Biblioteca

Sistema de gestión de biblioteca desarrollado con **NestJS**, implementando **Clean Architecture** y principios **SOLID**, con TypeORM y PostgreSQL.

[![NestJS](https://img.shields.io/badge/NestJS-v11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql)](https://www.postgresql.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-v0.3.28-FE0803)](https://typeorm.io/)

---

## 📑 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Arquitectura](#-arquitectura)
- [Principios SOLID](#-principios-solid)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Modelo de Datos](#-modelo-de-datos)
- [Instalación](#-instalación)
- [API Endpoints](#-api-endpoints)
- [Funcionalidades](#-funcionalidades)
- [Validaciones](#-validaciones)
- [Diagramas](#-diagramas)

---

## 🎯 Descripción General

Sistema completo para la **administración de préstamos de libros a estudiantes**, que permite:

- ✅ Registrar estudiantes en el sistema
- ✅ Gestionar bibliotecas y catálogos de libros
- ✅ Realizar préstamos de múltiples libros
- ✅ Controlar devoluciones y préstamos vencidos
- ✅ API RESTful versionada con documentación Swagger

### Métodos Principales
- `registerStudent()` - Registro de estudiantes
- `loanBook()` - Préstamo de libros
- `returnBook()` - Devolución de libros

---

## 🏗️ Arquitectura

El proyecto implementa **Clean Architecture**, garantizando:
- ✅ Separación de responsabilidades
- ✅ Independencia de frameworks
- ✅ Alta testabilidad
- ✅ Código mantenible y escalable

### Capas de la Arquitectura

```
┌─────────────────────────────────────────┐
│     🎯 PRESENTATION LAYER              │
│  (Controllers, DTOs, HTTP Handlers)    │
└─────────────────┬───────────────────────┘
                  │ Dependency Injection
┌─────────────────▼───────────────────────┐
│     💼 APPLICATION LAYER               │
│  (Services, Business Logic, Use Cases) │
└─────────────────┬───────────────────────┘
                  │ Interfaces
┌─────────────────▼───────────────────────┐
│     🏛️ DOMAIN LAYER                    │
│  (Entities, Interfaces, Business Rules)│
└─────────────────┬───────────────────────┘
                  │ Implementations
┌─────────────────▼───────────────────────┐
│     🔧 INFRASTRUCTURE LAYER            │
│  (TypeORM, Repositories, Database)     │
└─────────────────────────────────────────┘
```

#### 🎯 Presentation Layer
- **Responsabilidad**: Manejo de peticiones HTTP y respuestas
- **Componentes**: 4 Controllers, 5 DTOs validados
- **Características**: Swagger, validación automática, manejo de errores

#### 💼 Application Layer
- **Responsabilidad**: Lógica de negocio y casos de uso
- **Componentes**: 4 Services + 4 Service Interfaces
- **Características**: Validaciones de negocio, gestión de estados

#### 🏛️ Domain Layer
- **Responsabilidad**: Reglas de negocio y contratos
- **Componentes**: 5 Entity Interfaces, 5 DTO Interfaces, 5 Repository Interfaces
- **Características**: Independiente de frameworks, reglas puras

#### 🔧 Infrastructure Layer
- **Responsabilidad**: Detalles técnicos y persistencia
- **Componentes**: 5 TypeORM Entities, 5 Repositories, Migraciones
- **Características**: Integración PostgreSQL, implementaciones concretas

---

## 📁 Estructura del Proyecto

```
src/
├── 🎯 presentation/              # Capa de Presentación
│   ├── controllers/              # 4 Controladores REST
│   │   ├── biblioteca.controller.ts
│   │   ├── libro.controller.ts
│   │   ├── estudiante.controller.ts
│   │   └── prestamo.controller.ts
│   └── dto/                      # 5 DTOs con validaciones
│       ├── create-biblioteca.dto.ts
│       ├── create-libro.dto.ts
│       ├── create-estudiante.dto.ts
│       ├── create-prestamo.dto.ts
│       └── return-prestamo.dto.ts
│
├── 💼 application/               # Capa de Aplicación
│   └── services/
│       ├── interfaces/           # Interfaces para DI
│       │   ├── biblioteca-service.interface.ts
│       │   ├── libro-service.interface.ts
│       │   ├── estudiante-service.interface.ts
│       │   └── prestamo-service.interface.ts
│       ├── biblioteca.service.ts # Lógica de bibliotecas
│       ├── libro.service.ts      # Lógica de libros
│       ├── estudiante.service.ts # Lógica de estudiantes
│       └── prestamo.service.ts   # Lógica de préstamos
│
├── 🏛️ domain/                    # Capa de Dominio
│   ├── interfaces/
│   │   ├── entities/             # 5 Interfaces de entidades
│   │   │   ├── biblioteca.interface.ts
│   │   │   ├── libro.interface.ts (EstadoLibro enum)
│   │   │   ├── estudiante.interface.ts
│   │   │   ├── prestamo.interface.ts (EstadoPrestamo enum)
│   │   │   └── prestamo-detalle.interface.ts
│   │   └── dtos/                 # 5 Interfaces de DTOs
│   │       ├── create-biblioteca-dto.interface.ts
│   │       ├── create-libro-dto.interface.ts
│   │       ├── create-estudiante-dto.interface.ts
│   │       ├── create-prestamo-dto.interface.ts
│   │       └── return-prestamo-dto.interface.ts
│   └── repositories/             # 5 Interfaces de repositorios
│       ├── biblioteca.repository.interface.ts
│       ├── libro.repository.interface.ts
│       ├── estudiante.repository.interface.ts
│       ├── prestamo.repository.interface.ts
│       └── prestamo-detalle.repository.interface.ts
│
├── 🔧 infrastructure/            # Capa de Infraestructura
│   ├── database/
│   │   ├── entities/             # 5 Entidades TypeORM
│   │   │   ├── biblioteca.entity.ts
│   │   │   ├── libro.entity.ts
│   │   │   ├── estudiante.entity.ts
│   │   │   ├── prestamo.entity.ts
│   │   │   └── prestamo-detalle.entity.ts
│   │   └── migrations/           # Migraciones
│   │       └── InitialSchema.ts
│   └── repositories/             # 5 Implementaciones
│       ├── biblioteca.repository.ts
│       ├── libro.repository.ts
│       ├── estudiante.repository.ts
│       ├── prestamo.repository.ts
│       └── prestamo-detalle.repository.ts
│
├── 🔗 modules/                   # 4 Módulos NestJS
│   ├── biblioteca.module.ts
│   ├── libro.module.ts
│   ├── estudiante.module.ts
│   └── prestamo.module.ts
│
├── ⚙️ config/                    # Configuraciones
│   ├── database.config.ts
│   └── data-source.ts
│
├── app.module.ts                 # Módulo raíz
└── main.ts                       # Bootstrap + Swagger
```

---

## 💾 Modelo de Datos

### Tablas

1. **bibliotecas** - Información de bibliotecas
2. **libros** - Catálogo de libros
3. **estudiantes** - Registro de estudiantes
4. **prestamos** - Cabecera de préstamos
5. **prestamos_detalle** - Detalle de libros prestados

### Relaciones
- Biblioteca → Libros (1:N)
- Estudiante → Préstamos (1:N)
- Préstamo → Préstamos_Detalle (1:N)
- Libro → Préstamos_Detalle (1:N)

### Enumeraciones

**EstadoLibro**: `DISPONIBLE` | `PRESTADO` | `MANTENIMIENTO` | `PERDIDO`

**EstadoPrestamo**: `ACTIVO` | `DEVUELTO` | `VENCIDO`

---

## 🚀 Instalación

### Requisitos Previos
- Node.js v18+
- PostgreSQL v14+
- npm

### Pasos

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd Biblioteca
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu-password
DB_DATABASE=biblioteca_db

# Application
PORT=3000
NODE_ENV=development
```

4. **Crear la base de datos**
```sql
CREATE DATABASE biblioteca_db;
```

5. **Ejecutar migraciones**
```bash
npm run build
npm run migration:run
```

6. **Iniciar aplicación**
```bash
npm run start:dev
```

### Acceso
- **API Base URL**: `http://localhost:3000/api/v1`
- **Swagger Docs**: `http://localhost:3000/api/docs`

---

## 🌐 API Endpoints

### 📚 Bibliotecas - `/api/v1/bibliotecas`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear biblioteca |
| GET | `/` | Listar todas |
| GET | `/:id` | Obtener por ID |
| DELETE | `/:id` | Eliminar biblioteca |

**Ejemplo Request - Crear Biblioteca**:
```json
POST /api/v1/bibliotecas
{
  "nombre": "Biblioteca Central",
  "direccion": "Av. Principal 123",
  "telefono": "555-1234",
  "email": "biblioteca@ejemplo.com"
}
```

---

### 📖 Libros - `/api/v1/libros`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear libro |
| GET | `/` | Listar todos |
| DELETE | `/:id` | Eliminar libro |

**Ejemplo Request - Crear Libro**:
```json
POST /api/v1/libros
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "editorial": "Prentice Hall",
  "anioPublicacion": 2008,
  "bibliotecaId": 1
}
```

---

### 👨‍🎓 Estudiantes - `/api/v1/estudiantes`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/register` | Registrar estudiante |
| GET | `/` | Listar todos |
| GET | `/:numeroId` | Buscar por identificación |
| DELETE | `/:id` | Eliminar estudiante |

**Ejemplo Request - Registrar Estudiante**:
```json
POST /api/v1/estudiantes/register
{
  "nombres": "Juan Carlos",
  "apellidos": "Pérez García",
  "email": "juan.perez@ejemplo.com",
  "telefono": "555-5678",
  "numeroIdentificacion": "12345678",
  "carrera": "Ingeniería de Sistemas"
}
```

---

### 📋 Préstamos - `/api/v1/prestamos`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/loan` | Prestar libros |
| POST | `/return` | Devolver libros |
| GET | `/` | Listar todos |
| GET | `/active` | Listar activos |
| GET | `/overdue` | Listar vencidos |
| GET | `/:id` | Obtener por ID |

**Ejemplo Request - Préstamo de Libros**:
```json
POST /api/v1/prestamos/loan
{
  "estudianteId": 1,
  "libroIds": [1, 2, 3],
  "diasPrestamo": 15,
  "observaciones": "Préstamo para proyecto final"
}
```

**Ejemplo Request - Devolución de Libros**:
```json
POST /api/v1/prestamos/return
{
  "prestamoId": 1,
  "observaciones": "Devolución completa"
}
```

---

## ⚙️ Funcionalidades Principales

### 🏛️ Gestión de Bibliotecas
- ✅ Crear nuevas bibliotecas
- ✅ Listar todas las bibliotecas registradas
- ✅ Consultar información de biblioteca específica
- ✅ Eliminar bibliotecas del sistema

### 📚 Gestión de Libros
- ✅ Registrar libros con ISBN único
- ✅ Vincular libros a bibliotecas específicas
- ✅ Control de estados (DISPONIBLE, PRESTADO, MANTENIMIENTO, PERDIDO)
- ✅ Listar catálogo completo de libros
- ✅ Validación de duplicados por ISBN

### 👥 Registro de Estudiantes
- ✅ Registrar estudiantes con email único
- ✅ Número de identificación único
- ✅ Información completa (nombres, apellidos, carrera, contacto)
- ✅ Búsqueda por número de identificación
- ✅ Validación de duplicados

### 🔄 Gestión de Préstamos

#### Proceso de Préstamo (`loanBook`)
1. **Validación de estudiante** - Verifica que existe
2. **Validación de libros** - Confirma disponibilidad
3. **Creación de préstamo** - Genera registro con fechas
4. **Actualización de estados** - Marca libros como PRESTADO
5. **Registro de detalles** - Vincula libros al préstamo

#### Proceso de Devolución (`returnBook`)
1. **Validación de préstamo** - Confirma que está ACTIVO
2. **Registro de devolución** - Fecha real de devolución
3. **Detección de vencimiento** - Estado VENCIDO si aplica
4. **Actualización de libros** - Marca como DISPONIBLE
5. **Cierre de préstamo** - Estado DEVUELTO

#### Consultas Disponibles
- 📊 Listar todos los préstamos
- ✅ Préstamos activos solamente
- ⏰ Préstamos vencidos
- 🔍 Detalles específicos de un préstamo

---

## ✔️ Validaciones Implementadas

### Nivel de DTO (class-validator)
- ✅ Campos requeridos vs opcionales
- ✅ Longitudes mínimas y máximas
- ✅ Formato de email válido
- ✅ Tipos numéricos
- ✅ Arrays no vacíos
- ✅ Validaciones personalizadas

### Nivel de Servicio (Lógica de Negocio)

#### Bibliotecas
- ❌ No permitir nombres duplicados
- ✅ Todos los campos obligatorios presentes

#### Libros
- ❌ ISBN debe ser único
- ✅ Biblioteca debe existir antes de asociar
- ✅ Estado debe ser válido (enum)
- ❌ No cambiar a PRESTADO manualmente (solo por sistema)

#### Estudiantes
- ❌ Email debe ser único
- ❌ Número de identificación único
- ✅ Formato de email válido
- ✅ Información completa requerida

#### Préstamos
- ✅ Estudiante debe existir en el sistema
- ✅ Todos los libros deben existir
- ✅ Libros deben estar DISPONIBLES
- ❌ No permitir préstamo de libro ya prestado
- ❌ No permitir devolución de préstamo no activo
- ✅ Detectar automáticamente préstamos vencidos
- ✅ Días de préstamo debe ser > 0

---

## 🎨 Patrones de Diseño

### Repository Pattern
Abstrae el acceso a datos:
- Interfaces en capa de dominio
- Implementaciones en infraestructura
- Facilita testing con mocks

### Dependency Injection
Inyección mediante Symbol tokens:
```typescript


### DTO Pattern
Objetos de transferencia validados:

### Service Layer Pattern
Lógica de negocio centralizada:
- Validaciones complejas
- Orquestación de operaciones
- Gestión de transacciones

---


## 🎯 Flujo de Trabajo Ejemplo

### 1. Crear una biblioteca
```bash
POST /api/v1/bibliotecas
{
  "nombre": "Biblioteca Central",
  "direccion": "Calle 123",
  "telefono": "555-0000",
  "email": "central@lib.com"
}
# Response: { id: 1, ... }
```

### 2. Crear libros
```bash
POST /api/v1/libros
{
  "titulo": "Clean Code",
  "autor": "Robert Martin",
  "isbn": "978-0132350884",
  "bibliotecaId": 1
}
# Response: { id: 1, estado: "DISPONIBLE", ... }
```

### 3. Registrar estudiante
```bash
POST /api/v1/estudiantes/register
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "email": "juan@mail.com",
  "numeroIdentificacion": "12345678"
}
# Response: { id: 1, ... }
```

### 4. Realizar préstamo
```bash
POST /api/v1/prestamos/loan
{
  "estudianteId": 1,
  "libroIds": [1, 2],
  "diasPrestamo": 15
}
# Response: { id: 1, estado: "ACTIVO", ... }
```

### 5. Devolver libros
```bash
POST /api/v1/prestamos/return
{
  "prestamoId": 1
}
# Response: { estado: "DEVUELTO", ... }
```

---

## ⚠️ Manejo de Errores

### Códigos HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa |
| 201 | Created | Recurso creado |
| 400 | Bad Request | Validación fallida |
| 404 | Not Found | Recurso no existe |
| 500 | Server Error | Error interno |


## 📄 Licencia

UNLICENSED - Uso interno

---

## 👨‍💻 Autor

**Sistema de Biblioteca v1.0.0**  
Desarrollado con ❤️ usando NestJS + Clean Architecture  
Fecha: Febrero 2026

---

**¡Gracias por usar el Sistema de Gestión de Biblioteca!** 📚
