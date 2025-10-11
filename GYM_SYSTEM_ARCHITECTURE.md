# Gym Management System - Full-Stack Learning Project

**Architecture**: Monorepo + Microservices + Domain-Driven Design (DDD)
**Target Audience**: Frontend developers learning backend development
**Learning Level**: Extreme - Production-grade code quality and architecture

---

## Table of Contents

1. [Introduction for Frontend Developers](#introduction-for-frontend-developers)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Code Quality Setup](#code-quality-setup)
7. [Docker Environment](#docker-environment)
8. [Development Workflow](#development-workflow)
9. [DDD Concepts Explained](#ddd-concepts-explained)
10. [Backend Concepts for Frontend Devs](#backend-concepts-for-frontend-devs)
11. [Common Pitfalls](#common-pitfalls)

---

## Introduction for Frontend Developers

Welcome! This project is designed to take you from frontend developer to full-stack engineer through hands-on learning with enterprise-level architecture.

### Why This Stack?

- **NestJS** - Angular-like structure you'll recognize as a frontend dev
- **TypeScript** - Type safety you already know and love
- **GraphQL** - Modern API layer (like Apollo Client, but server-side)
- **DDD** - Organize code like you organize React components (by domain/feature)
- **Microservices** - Like building multiple Next.js apps that talk to each other

### What You'll Learn

✅ Backend architecture patterns (not just CRUD)
✅ Database design and migrations
✅ Inter-service communication (RabbitMQ)
✅ Event-driven architecture
✅ API design (GraphQL + REST)
✅ Docker and DevOps basics
✅ Testing strategies (unit, integration, E2E)
✅ Production-grade code quality tooling

---

## Architecture Overview

### Monorepo + Microservices + DDD

```
┌─────────────────────────────────────────────────────┐
│              GYM MANAGEMENT SYSTEM                  │
│                  (One Git Repo)                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  apps/                                              │
│  ├── membership/      → :3001 (Auth, Members)      │
│  ├── scheduling/      → :3002 (Classes, Bookings)  │
│  ├── payments/        → :3003 (Billing, Subs)      │
│  ├── api-gateway/     → :3000 (GraphQL Gateway)    │
│  └── notifications/   → Worker (Emails, SMS)       │
│                                                     │
│  libs/shared/         → Common code                 │
│                                                     │
└─────────────────────────────────────────────────────┘
         ↓ Runtime (Docker Compose)
┌─────────────────────────────────────────────────────┐
│  Services Running:                                  │
│  ├── PostgreSQL :5432                              │
│  ├── Redis       :6379                              │
│  ├── RabbitMQ    :5672, :15672 (management)        │
│  ├── Elasticsearch :9200                            │
│  └── MongoDB     :27017                             │
└─────────────────────────────────────────────────────┘
```

### Why This Approach?

**Monorepo Benefits:**
- Share TypeScript types between services
- Single `npm install` for all services
- Refactor across services easily
- One CI/CD pipeline

**Microservices Benefits:**
- Each service can scale independently
- Different databases per service if needed
- Team can own one service
- Failure isolation

**DDD Benefits:**
- Code organized by business domain (like feature folders in React)
- Clear boundaries (bounded contexts)
- Business logic separated from infrastructure

---

## Technology Stack

### Backend Framework
```json
{
  "@nestjs/core": "^10.4.7",
  "@nestjs/common": "^10.4.7",
  "@nestjs/graphql": "^12.2.1",
  "@nestjs/microservices": "^10.4.7"
}
```
**Why NestJS?** Angular-inspired, TypeScript-first, built-in DI, production-ready

### APIs
- **GraphQL** - Apollo Server v4 (primary API for frontend)
- **REST** - Express with Swagger docs (external integrations)

### Databases
```yaml
PostgreSQL: Primary relational database
  - TypeORM for ORM
  - Migrations for schema management

Redis: Caching and session management
  - ioredis client
  - Rate limiting storage

Elasticsearch: Full-text search and logging
  - Member search
  - Class search
  - System logs

MongoDB: Document storage (optional)
  - Event sourcing
  - Analytics data
```

### Message Queue
- **RabbitMQ** - Event-driven communication between services
  - Member registered → Send welcome email
  - Payment succeeded → Activate membership
  - Booking created → Notify trainer

### Authentication & Authorization
```typescript
Passport: Authentication strategies
  - JWT tokens
  - Local (email/password)
  - OAuth2 (Google, Apple)

Argon2: Password hashing (better than bcrypt)
```

### Testing
```json
{
  "jest": "^29.3.1",
  "supertest": "^6.3.3",
  "@nestjs/testing": "^10.4.7"
}
```

### Code Quality Tools
```json
{
  "eslint": "^8.31.0",
  "prettier": "^2.8.1",
  "husky": "^8.0.0",
  "lint-staged": "^13.0.0",
  "typescript": "^4.9.4"
}
```

### Key Libraries
- **class-validator**: DTO validation (like Zod)
- **class-transformer**: Object transformation
- **dataloader**: Solve N+1 queries in GraphQL
- **date-fns**: Date manipulation
- **nanoid/uuid**: Unique ID generation

---

## Project Structure

### Monorepo Layout (DDD + Microservices)

```
gym-system/
├── apps/                                    # Microservices
│   ├── membership/                         # Membership Bounded Context
│   │   ├── src/
│   │   │   ├── domain/                     # Business logic layer
│   │   │   │   ├── entities/               # Domain entities
│   │   │   │   │   ├── member.entity.ts
│   │   │   │   │   └── membership.entity.ts
│   │   │   │   ├── value-objects/          # Immutable values
│   │   │   │   │   ├── email.vo.ts
│   │   │   │   │   └── phone.vo.ts
│   │   │   │   ├── repositories/           # Interfaces only
│   │   │   │   │   └── member.repository.interface.ts
│   │   │   │   ├── services/               # Domain services
│   │   │   │   │   └── membership.service.ts
│   │   │   │   └── events/                 # Domain events
│   │   │   │       └── member-registered.event.ts
│   │   │   │
│   │   │   ├── application/                # Use cases layer
│   │   │   │   ├── commands/               # Write operations
│   │   │   │   │   ├── register-member.command.ts
│   │   │   │   │   └── register-member.handler.ts
│   │   │   │   ├── queries/                # Read operations
│   │   │   │   │   ├── get-member.query.ts
│   │   │   │   │   └── get-member.handler.ts
│   │   │   │   └── dto/                    # Data transfer objects
│   │   │   │       ├── register-member.dto.ts
│   │   │   │       └── member.dto.ts
│   │   │   │
│   │   │   ├── infrastructure/             # Technical layer
│   │   │   │   ├── persistence/            # Database implementation
│   │   │   │   │   ├── typeorm/
│   │   │   │   │   │   ├── entities/       # TypeORM entities
│   │   │   │   │   │   │   └── member.entity.ts
│   │   │   │   │   │   ├── repositories/   # Repository implementation
│   │   │   │   │   │   │   └── member.repository.ts
│   │   │   │   │   │   └── migrations/     # Database migrations
│   │   │   │   │   │       └── 1234567890-create-members.ts
│   │   │   │   │   └── typeorm.config.ts
│   │   │   │   ├── messaging/              # RabbitMQ
│   │   │   │   │   └── member-events.publisher.ts
│   │   │   │   └── cache/                  # Redis
│   │   │   │       └── member.cache.ts
│   │   │   │
│   │   │   ├── presentation/               # API layer
│   │   │   │   ├── graphql/                # GraphQL resolvers
│   │   │   │   │   ├── member.resolver.ts
│   │   │   │   │   └── member.schema.graphql
│   │   │   │   ├── rest/                   # REST controllers
│   │   │   │   │   └── member.controller.ts
│   │   │   │   └── guards/                 # Auth guards
│   │   │   │       └── jwt-auth.guard.ts
│   │   │   │
│   │   │   ├── config/                     # Configuration
│   │   │   │   ├── database.config.ts
│   │   │   │   └── rabbitmq.config.ts
│   │   │   │
│   │   │   ├── membership.module.ts        # Main module
│   │   │   └── main.ts                     # Entry point
│   │   │
│   │   ├── test/                           # Tests
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── e2e/
│   │   │
│   │   └── tsconfig.app.json
│   │
│   ├── scheduling/                         # Scheduling Bounded Context
│   │   ├── src/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── class.entity.ts
│   │   │   │   │   ├── booking.entity.ts
│   │   │   │   │   └── trainer.entity.ts
│   │   │   │   ├── repositories/
│   │   │   │   └── services/
│   │   │   ├── application/
│   │   │   ├── infrastructure/
│   │   │   └── presentation/
│   │   └── ...
│   │
│   ├── payments/                           # Payments Bounded Context
│   │   ├── src/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── subscription.entity.ts
│   │   │   │   │   ├── payment.entity.ts
│   │   │   │   │   └── invoice.entity.ts
│   │   │   │   └── services/
│   │   │   ├── application/
│   │   │   ├── infrastructure/
│   │   │   │   └── payment-providers/
│   │   │   │       ├── stripe.provider.ts
│   │   │   │       └── payment.interface.ts
│   │   │   └── presentation/
│   │   └── ...
│   │
│   ├── api-gateway/                        # GraphQL Gateway
│   │   ├── src/
│   │   │   ├── gateway.module.ts
│   │   │   ├── schema.graphql              # Federated schema
│   │   │   └── main.ts
│   │   └── ...
│   │
│   └── notifications/                      # Background Worker
│       ├── src/
│       │   ├── consumers/                  # RabbitMQ consumers
│       │   │   ├── email.consumer.ts
│       │   │   └── sms.consumer.ts
│       │   ├── services/
│       │   │   ├── email.service.ts
│       │   │   └── sms.service.ts
│       │   └── main.ts
│       └── ...
│
├── libs/                                    # Shared libraries
│   └── shared/
│       ├── src/
│       │   ├── guards/                     # Reusable guards
│       │   │   ├── jwt-auth.guard.ts
│       │   │   └── roles.guard.ts
│       │   ├── decorators/                 # Custom decorators
│       │   │   ├── current-user.decorator.ts
│       │   │   └── public.decorator.ts
│       │   ├── filters/                    # Exception filters
│       │   │   └── http-exception.filter.ts
│       │   ├── interceptors/               # Interceptors
│       │   │   └── logging.interceptor.ts
│       │   ├── utils/                      # Utilities
│       │   │   ├── pagination.util.ts
│       │   │   └── hash.util.ts
│       │   ├── types/                      # Shared types
│       │   └── constants/                  # Constants
│       └── index.ts
│
├── database/                               # Shared database utilities
│   ├── migrations/                         # Global migrations
│   └── seeds/                              # Seed data
│
├── docker/                                 # Docker configurations
│   ├── postgres/
│   │   └── Dockerfile
│   ├── redis/
│   │   └── Dockerfile
│   └── elasticsearch/
│       └── Dockerfile
│
├── config/                                 # Root configurations
│   ├── .eslintrc.js
│   ├── .prettierrc
│   └── jest.config.js
│
├── scripts/                                # Utility scripts
│   └── wait-for-services.js
│
├── docker-compose.yml                      # Local development
├── docker-compose.test.yml                 # Testing environment
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── nest-cli.json                           # NestJS monorepo config
├── .env.example                            # Environment template
├── .gitignore
├── .husky/                                 # Git hooks
│   ├── pre-commit
│   └── pre-push
└── README.md
```

---

## Getting Started

### Prerequisites

```bash
# Required versions
Node.js: >= 18.x
npm: >= 9.x
Docker: >= 20.x
Docker Compose: >= 2.x
```

### Step 1: Initialize Project

```bash
# Install NestJS CLI globally
npm install -g @nestjs/cli

# Create monorepo project
nest new gym-system
cd gym-system

# Convert to monorepo
nest generate app membership
nest generate app scheduling
nest generate app payments
nest generate app api-gateway
nest generate app notifications

# Create shared library
nest generate library shared
```

### Step 2: Install Dependencies

```bash
# Core NestJS packages
npm install @nestjs/core @nestjs/common @nestjs/platform-express
npm install @nestjs/config @nestjs/microservices
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
npm install @nestjs/swagger

# Database
npm install @nestjs/typeorm typeorm pg
npm install typeorm-naming-strategies

# Caching & Sessions
npm install @nestjs/cache-manager cache-manager
npm install @liaoliaots/nestjs-redis ioredis

# Message Queue
npm install @golevelup/nestjs-rabbitmq amqplib amqp-connection-manager

# Search
npm install @nestjs/elasticsearch @elastic/elasticsearch

# MongoDB (optional)
npm install @nestjs/mongoose mongoose

# Authentication
npm install @nestjs/passport @nestjs/jwt passport passport-jwt passport-local
npm install argon2

# Validation & Transformation
npm install class-validator class-transformer

# Utilities
npm install date-fns nanoid lodash
npm install reflect-metadata rxjs

# Development Dependencies
npm install -D @types/node @types/passport-jwt @types/passport-local
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint eslint-config-prettier eslint-plugin-prettier
npm install -D prettier
npm install -D jest @nestjs/testing ts-jest @types/jest
npm install -D supertest @types/supertest
npm install -D husky lint-staged
npm install -D ts-node ts-loader tsconfig-paths
npm install -D source-map-support
```

### Step 3: Environment Setup

Create `.env` file:

```bash
# Application
NODE_ENV=development
PORT=3000

# Membership Service
MEMBERSHIP_PORT=3001

# Scheduling Service
SCHEDULING_PORT=3002

# Payments Service
PAYMENTS_PORT=3003

# API Gateway
GATEWAY_PORT=3000

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=gym_admin
POSTGRES_PASSWORD=gym_password_123
POSTGRES_DATABASE=gym_system

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password_123

# RabbitMQ
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin
RABBITMQ_VHOST=/

# Elasticsearch
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=elastic_password

# MongoDB (optional)
MONGODB_URI=mongodb://admin:admin@localhost:27017/gym_system?authSource=admin

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRATION=30d

# Stripe (Payment Provider)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@gym.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890

# Logging
LOG_LEVEL=debug
```

### Step 4: TypeScript Configuration

**Root `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,

    // Strict mode (EXTREME LEARNING)
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Additional checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,

    // Path aliases
    "paths": {
      "@shared": ["libs/shared/src"],
      "@shared/*": ["libs/shared/src/*"],
      "@membership/*": ["apps/membership/src/*"],
      "@scheduling/*": ["apps/scheduling/src/*"],
      "@payments/*": ["apps/payments/src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### Step 5: NestJS Monorepo Configuration

**`nest-cli.json`:**
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/membership/src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": true
  },
  "monorepo": true,
  "root": "apps/membership",
  "projects": {
    "membership": {
      "type": "application",
      "root": "apps/membership",
      "entryFile": "main",
      "sourceRoot": "apps/membership/src",
      "compilerOptions": {
        "tsConfigPath": "apps/membership/tsconfig.app.json"
      }
    },
    "scheduling": {
      "type": "application",
      "root": "apps/scheduling",
      "entryFile": "main",
      "sourceRoot": "apps/scheduling/src",
      "compilerOptions": {
        "tsConfigPath": "apps/scheduling/tsconfig.app.json"
      }
    },
    "payments": {
      "type": "application",
      "root": "apps/payments",
      "entryFile": "main",
      "sourceRoot": "apps/payments/src",
      "compilerOptions": {
        "tsConfigPath": "apps/payments/tsconfig.app.json"
      }
    },
    "api-gateway": {
      "type": "application",
      "root": "apps/api-gateway",
      "entryFile": "main",
      "sourceRoot": "apps/api-gateway/src",
      "compilerOptions": {
        "tsConfigPath": "apps/api-gateway/tsconfig.app.json"
      }
    },
    "notifications": {
      "type": "application",
      "root": "apps/notifications",
      "entryFile": "main",
      "sourceRoot": "apps/notifications/src",
      "compilerOptions": {
        "tsConfigPath": "apps/notifications/tsconfig.app.json"
      }
    },
    "shared": {
      "type": "library",
      "root": "libs/shared",
      "entryFile": "index",
      "sourceRoot": "libs/shared/src",
      "compilerOptions": {
        "tsConfigPath": "libs/shared/tsconfig.lib.json"
      }
    }
  }
}
```

---

## Code Quality Setup

### ESLint Configuration

**`.eslintrc.js`:**
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
  rules: {
    // TypeScript specific
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',

    // General best practices
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'quote-props': ['error', 'as-needed'],

    // Import organization
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
    }],
  },
};
```

### Prettier Configuration

**`.prettierrc`:**
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "bracketSameLine": false
}
```

### Husky + Git Hooks Setup

```bash
# Initialize Husky
npx husky-init && npm install

# Configure pre-commit hook
npx husky set .husky/pre-commit "npm run pre-commit"

# Configure pre-push hook
npx husky set .husky/pre-push "npm run pre-push"
```

**`.husky/pre-commit`:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."
npm run lint-staged
```

**`.husky/pre-push`:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🧪 Running tests before push..."
npm run test:all

echo "🔍 Type checking..."
npm run typecheck
```

### Lint-Staged Configuration

**`package.json` addition:**
```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write",
      "bash -c 'tsc --noEmit -p tsconfig.json'"
    ]
  }
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "// BUILD": "",
    "build": "nest build",
    "build:membership": "nest build membership",
    "build:scheduling": "nest build scheduling",
    "build:payments": "nest build payments",
    "build:gateway": "nest build api-gateway",
    "build:notifications": "nest build notifications",
    "build:all": "npm run build:membership && npm run build:scheduling && npm run build:payments && npm run build:gateway && npm run build:notifications",

    "// DEVELOPMENT": "",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:membership": "nest start membership --watch",
    "start:scheduling": "nest start scheduling --watch",
    "start:payments": "nest start payments --watch",
    "start:gateway": "nest start api-gateway --watch",
    "start:notifications": "nest start notifications --watch",

    "// PRODUCTION": "",
    "start:prod:membership": "node dist/apps/membership/main",
    "start:prod:scheduling": "node dist/apps/scheduling/main",
    "start:prod:payments": "node dist/apps/payments/main",
    "start:prod:gateway": "node dist/apps/api-gateway/main",
    "start:prod:notifications": "node dist/apps/notifications/main",

    "// CODE QUALITY": "",
    "lint": "eslint \"{apps,libs}/**/*.ts\" --fix",
    "lint:check": "eslint \"{apps,libs}/**/*.ts\"",
    "format": "prettier --write \"apps/**/*.ts\" \"libs/**/*.ts\"",
    "format:check": "prettier --check \"apps/**/*.ts\" \"libs/**/*.ts\"",
    "typecheck": "tsc --noEmit -p tsconfig.json",

    "// GIT HOOKS": "",
    "pre-commit": "lint-staged",
    "pre-push": "npm run test:all && npm run typecheck",
    "prepare": "husky install",

    "// TESTING": "",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "test:all": "npm run test && npm run test:e2e",

    "// DATABASE": "",
    "typeorm": "ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js",
    "migration:run": "npm run typeorm migration:run -- -d ormconfig.ts",
    "migration:revert": "npm run typeorm migration:revert -- -d ormconfig.ts",
    "migration:create": "npm run typeorm migration:create",
    "migration:generate": "npm run typeorm migration:generate -- -d ormconfig.ts",
    "migration:show": "npm run typeorm migration:show -- -d ormconfig.ts",

    "// DOCKER": "",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",
    "docker:clean": "docker-compose down -v && docker system prune -f"
  }
}
```

---

## Docker Environment

### Docker Compose Configuration

**`docker-compose.yml`:**
```yaml
version: '3.8'

networks:
  gym-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
  elasticsearch_data:
  mongo_data:

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: gym_postgres
    restart: unless-stopped
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: gym_admin
      POSTGRES_PASSWORD: gym_password_123
      POSTGRES_DB: gym_system
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - gym-network
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U gym_admin']
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: gym_redis
    restart: unless-stopped
    ports:
      - '6379:6379'
    command: redis-server --requirepass redis_password_123
    volumes:
      - redis_data:/data
    networks:
      - gym-network
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  # RabbitMQ Message Broker
  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    container_name: gym_rabbitmq
    restart: unless-stopped
    ports:
      - '5672:5672'   # AMQP protocol
      - '15672:15672' # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - gym-network
    healthcheck:
      test: rabbitmq-diagnostics -q ping
      interval: 10s
      timeout: 5s
      retries: 5

  # Elasticsearch
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: gym_elasticsearch
    restart: unless-stopped
    ports:
      - '9200:9200'
      - '9300:9300'
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - 'ES_JAVA_OPTS=-Xms512m -Xmx512m'
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - gym-network
    healthcheck:
      test: ['CMD-SHELL', 'curl -f http://localhost:9200/_cluster/health || exit 1']
      interval: 30s
      timeout: 10s
      retries: 5

  # Kibana (Elasticsearch UI)
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: gym_kibana
    restart: unless-stopped
    ports:
      - '5601:5601'
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    depends_on:
      - elasticsearch
    networks:
      - gym-network

  # MongoDB (optional)
  mongo:
    image: mongo:7.0
    container_name: gym_mongo
    restart: unless-stopped
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin
      MONGO_INITDB_DATABASE: gym_system
    volumes:
      - mongo_data:/data/db
    networks:
      - gym-network

  # PgAdmin (PostgreSQL UI)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: gym_pgadmin
    restart: unless-stopped
    ports:
      - '5050:80'
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@gym.com
      PGADMIN_DEFAULT_PASSWORD: admin
    networks:
      - gym-network
```

### Starting Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps

# Stop all services
docker-compose down

# Clean everything (including volumes)
docker-compose down -v
```

### Service Access URLs

```
PostgreSQL:      localhost:5432
  - User: gym_admin
  - Password: gym_password_123
  - Database: gym_system

Redis:           localhost:6379
  - Password: redis_password_123

RabbitMQ:
  - AMQP: localhost:5672
  - Management: http://localhost:15672
    User: admin / admin

Elasticsearch:   http://localhost:9200

Kibana:          http://localhost:5601

MongoDB:         localhost:27017
  - User: admin / admin

PgAdmin:         http://localhost:5050
  - Email: admin@gym.com / admin
```

---

## Development Workflow

### Daily Development Flow

```bash
# 1. Start Docker services
docker-compose up -d

# 2. Run database migrations
npm run migration:run

# 3. Start service(s) in watch mode
npm run start:membership    # Terminal 1
npm run start:scheduling    # Terminal 2
npm run start:payments      # Terminal 3
npm run start:gateway       # Terminal 4

# 4. Make changes (auto-reload enabled)

# 5. Run tests
npm run test:watch

# 6. Before committing (automatic via Husky)
# - ESLint checks
# - Prettier formatting
# - Type checking
# - Tests run

# 7. Commit (hooks run automatically)
git add .
git commit -m "feat: add member registration"

# 8. Push (tests run automatically)
git push
```

### Creating a New Feature (Example: Member Registration)

**Step 1: Domain Layer**
```typescript
// apps/membership/src/domain/entities/member.entity.ts
export class Member {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dateOfBirth: Date,
    public readonly createdAt: Date,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
```

**Step 2: Repository Interface**
```typescript
// apps/membership/src/domain/repositories/member.repository.interface.ts
export interface IMemberRepository {
  save(member: Member): Promise<Member>;
  findById(id: string): Promise<Member | null>;
  findByEmail(email: string): Promise<Member | null>;
  findAll(): Promise<Member[]>;
  delete(id: string): Promise<void>;
}
```

**Step 3: Application Layer - Command**
```typescript
// apps/membership/src/application/commands/register-member.command.ts
export class RegisterMemberCommand {
  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dateOfBirth: Date,
    public readonly password: string,
  ) {}
}

// apps/membership/src/application/commands/register-member.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterMemberCommand } from './register-member.command';
import { IMemberRepository } from '../../domain/repositories/member.repository.interface';
import { Member } from '../../domain/entities/member.entity';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';

@CommandHandler(RegisterMemberCommand)
export class RegisterMemberHandler implements ICommandHandler<RegisterMemberCommand> {
  constructor(private readonly memberRepository: IMemberRepository) {}

  async execute(command: RegisterMemberCommand): Promise<Member> {
    // Check if email exists
    const existingMember = await this.memberRepository.findByEmail(command.email);
    if (existingMember) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await argon2.hash(command.password);

    // Create member
    const member = new Member(
      nanoid(),
      command.email,
      command.firstName,
      command.lastName,
      command.dateOfBirth,
      new Date(),
    );

    // Save
    return await this.memberRepository.save(member);
  }
}
```

**Step 4: Infrastructure - TypeORM Entity**
```typescript
// apps/membership/src/infrastructure/persistence/typeorm/entities/member.entity.ts
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('members')
export class MemberEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

**Step 5: Infrastructure - Repository Implementation**
```typescript
// apps/membership/src/infrastructure/persistence/typeorm/repositories/member.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMemberRepository } from '../../../../domain/repositories/member.repository.interface';
import { Member } from '../../../../domain/entities/member.entity';
import { MemberEntity } from '../entities/member.entity';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repository: Repository<MemberEntity>,
  ) {}

  async save(member: Member): Promise<Member> {
    const entity = this.repository.create({
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      dateOfBirth: member.dateOfBirth,
      createdAt: member.createdAt,
    });

    await this.repository.save(entity);
    return member;
  }

  async findById(id: string): Promise<Member | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<Member | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Member[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(entity: MemberEntity): Member {
    return new Member(
      entity.id,
      entity.email,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      entity.createdAt,
    );
  }
}
```

**Step 6: Presentation - GraphQL Resolver**
```typescript
// apps/membership/src/presentation/graphql/member.resolver.ts
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterMemberCommand } from '../../application/commands/register-member.command';
import { RegisterMemberInput } from './dto/register-member.input';
import { MemberDto } from './dto/member.dto';

@Resolver(() => MemberDto)
export class MemberResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MemberDto)
  async registerMember(
    @Args('input') input: RegisterMemberInput,
  ): Promise<MemberDto> {
    const command = new RegisterMemberCommand(
      input.email,
      input.firstName,
      input.lastName,
      input.dateOfBirth,
      input.password,
    );

    const member = await this.commandBus.execute(command);
    return this.toDto(member);
  }

  private toDto(member: Member): MemberDto {
    return {
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      fullName: member.fullName,
      age: member.age,
      createdAt: member.createdAt,
    };
  }
}
```

**Step 7: Write Tests**
```typescript
// apps/membership/src/application/commands/register-member.handler.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterMemberHandler } from './register-member.handler';
import { RegisterMemberCommand } from './register-member.command';
import { IMemberRepository } from '../../domain/repositories/member.repository.interface';

describe('RegisterMemberHandler', () => {
  let handler: RegisterMemberHandler;
  let mockRepository: jest.Mocked<IMemberRepository>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterMemberHandler,
        {
          provide: 'IMemberRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get<RegisterMemberHandler>(RegisterMemberHandler);
  });

  it('should register a new member', async () => {
    // Arrange
    mockRepository.findByEmail.mockResolvedValue(null);
    const command = new RegisterMemberCommand(
      'test@example.com',
      'John',
      'Doe',
      new Date('1990-01-01'),
      'password123',
    );

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result.email).toBe('test@example.com');
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw error if email already exists', async () => {
    // Arrange
    const existingMember = new Member(/* ... */);
    mockRepository.findByEmail.mockResolvedValue(existingMember);

    const command = new RegisterMemberCommand(/* ... */);

    // Act & Assert
    await expect(handler.execute(command)).rejects.toThrow('Email already registered');
  });
});
```

---

## DDD Concepts Explained

### What is Domain-Driven Design?

**For Frontend Devs**: Think of DDD like organizing React components by feature instead of by type.

```
❌ Bad (by type):
src/
├── components/
├── hooks/
└── utils/

✅ Good (by feature):
src/
├── auth/
├── products/
└── checkout/
```

Same concept in backend - organize by **business domain**.

### Key DDD Concepts

#### 1. **Entity**
An object with unique identity that persists over time.

```typescript
// Has identity (id)
class Member {
  constructor(
    public readonly id: string,  // ← Identity
    public email: string,
  ) {}
}

const member1 = new Member('1', 'test@example.com');
const member2 = new Member('1', 'test@example.com');

// Same entity (same id)
console.log(member1 === member2); // false (different objects)
console.log(member1.id === member2.id); // true (same entity)
```

#### 2. **Value Object**
An object defined by its attributes, not identity. Immutable.

```typescript
// No identity, defined by value
class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email');
    }
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }
}

const email1 = new Email('test@example.com');
const email2 = new Email('test@example.com');

// Same value = equivalent
console.log(email1.toString() === email2.toString()); // true
```

#### 3. **Aggregate**
A cluster of entities and value objects treated as one unit.

```typescript
// Booking is the Aggregate Root
class Booking {
  constructor(
    public readonly id: string,
    private member: Member,          // Entity
    private gymClass: GymClass,      // Entity
    private bookingDate: Date,       // Value Object
    private status: BookingStatus,   // Value Object
  ) {}

  // Only aggregate root can modify its children
  cancel(): void {
    if (this.status === BookingStatus.COMPLETED) {
      throw new Error('Cannot cancel completed booking');
    }
    this.status = BookingStatus.CANCELLED;
  }

  // Enforce business rules
  reschedule(newDate: Date): void {
    const now = new Date();
    if (newDate < now) {
      throw new Error('Cannot reschedule to past date');
    }
    this.bookingDate = newDate;
  }
}
```

#### 4. **Repository**
Interface to access aggregates (like a collection).

```typescript
// Domain layer (interface only)
interface IBookingRepository {
  save(booking: Booking): Promise<Booking>;
  findById(id: string): Promise<Booking | null>;
  findByMember(memberId: string): Promise<Booking[]>;
}

// Infrastructure layer (implementation)
class BookingRepository implements IBookingRepository {
  // TypeORM, Prisma, etc.
  async save(booking: Booking): Promise<Booking> {
    // Database logic here
  }
}
```

#### 5. **Domain Service**
Business logic that doesn't belong to any entity.

```typescript
// When logic involves multiple entities
class MembershipUpgradeService {
  constructor(
    private memberRepository: IMemberRepository,
    private paymentService: IPaymentService,
  ) {}

  async upgradeMembership(
    memberId: string,
    newPlan: MembershipPlan,
  ): Promise<void> {
    const member = await this.memberRepository.findById(memberId);
    const payment = await this.paymentService.charge(
      member,
      newPlan.price,
    );

    member.upgradePlan(newPlan);
    await this.memberRepository.save(member);
  }
}
```

#### 6. **Domain Events**
Something that happened in the domain that other parts care about.

```typescript
// Event (past tense - already happened)
class MemberRegisteredEvent {
  constructor(
    public readonly memberId: string,
    public readonly email: string,
    public readonly occurredAt: Date,
  ) {}
}

// Publish event
class RegisterMemberHandler {
  async execute(command: RegisterMemberCommand): Promise<void> {
    const member = new Member(/* ... */);
    await this.memberRepository.save(member);

    // Publish event
    await this.eventBus.publish(
      new MemberRegisteredEvent(member.id, member.email, new Date())
    );
  }
}

// Subscribe to event (in notifications service)
@EventHandler(MemberRegisteredEvent)
class SendWelcomeEmailHandler {
  async handle(event: MemberRegisteredEvent): Promise<void> {
    await this.emailService.send(
      event.email,
      'Welcome to Our Gym!',
      'welcomeTemplate',
    );
  }
}
```

### Bounded Contexts

Think of bounded contexts like **separate Next.js apps** in a monorepo.

```
Membership Context:
  - Member means: Person with account
  - Payment means: Subscription fee

Scheduling Context:
  - Member means: Person who can book classes
  - Payment means: Class booking fee

Payment Context:
  - Member means: Customer with payment method
  - Payment means: Financial transaction
```

Each context has its **own models** and **own database tables**.

---

## Backend Concepts for Frontend Devs

### 1. Dependency Injection (DI)

**Frontend (React)**:
```typescript
// Props drilling
function App() {
  const api = new ApiClient();
  return <Dashboard api={api} />;
}

function Dashboard({ api }) {
  return <UserList api={api} />;
}
```

**Backend (NestJS)**:
```typescript
// DI Container manages dependencies
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,  // ← Injected
    private readonly emailService: EmailService,      // ← Injected
  ) {}
}

// NestJS creates and injects automatically
```

### 2. Decorators

**Frontend (React)**:
```typescript
// Higher-Order Components
const withAuth = (Component) => {
  return (props) => {
    if (!isAuthenticated()) return <Login />;
    return <Component {...props} />;
  };
};
```

**Backend (NestJS)**:
```typescript
// Decorators add metadata/behavior
@Controller('users')
export class UserController {
  @Get(':id')
  @UseGuards(JwtAuthGuard)  // ← Like HOC
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
```

### 3. Guards (Middleware)

**Frontend (React Router)**:
```typescript
<Route
  path="/dashboard"
  element={<PrivateRoute><Dashboard /></PrivateRoute>}
/>
```

**Backend (NestJS)**:
```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return validateToken(request.headers.authorization);
  }
}

// Use on routes
@Get()
@UseGuards(JwtAuthGuard)  // ← Like PrivateRoute
async getData() {}
```

### 4. Async/Await Patterns

**Frontend**: You're used to this
```typescript
const data = await fetch('/api/users').then(r => r.json());
```

**Backend**: Same, but with databases
```typescript
const user = await this.userRepository.findOne({ where: { id } });
if (!user) throw new NotFoundException();
return user;
```

**⚠️ Common Mistake**: Not awaiting Promises
```typescript
// ❌ Wrong
const user = this.userRepository.save(newUser);  // Returns Promise
console.log(user.id);  // undefined!

// ✅ Correct
const user = await this.userRepository.save(newUser);
console.log(user.id);  // Works!
```

### 5. Database Transactions

**Frontend**: No direct equivalent
**Backend**: Like git commits - all or nothing

```typescript
// Without transaction (BAD)
await this.memberRepository.save(member);
await this.paymentRepository.save(payment);
// If payment fails, member is already saved! 😱

// With transaction (GOOD)
await this.dataSource.transaction(async (manager) => {
  await manager.save(Member, member);
  await manager.save(Payment, payment);
  // If payment fails, member save is rolled back ✅
});
```

### 6. GraphQL Resolvers vs REST Controllers

**REST Controller**:
```typescript
@Controller('members')
export class MemberController {
  @Get()
  async getAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(dto);
  }
}
```

**GraphQL Resolver**:
```typescript
@Resolver(() => Member)
export class MemberResolver {
  @Query(() => [Member])
  async members(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Mutation(() => Member)
  async createMember(@Args('input') input: CreateMemberInput): Promise<Member> {
    return this.memberService.create(input);
  }

  // Nested fields (like Apollo Client)
  @ResolveField(() => [Booking])
  async bookings(@Parent() member: Member): Promise<Booking[]> {
    return this.bookingService.findByMember(member.id);
  }
}
```

### 7. Environment Variables

**Frontend (React)**:
```typescript
// .env
REACT_APP_API_URL=http://localhost:3000

// Usage
const apiUrl = process.env.REACT_APP_API_URL;
```

**Backend (NestJS)**:
```typescript
// .env
DATABASE_URL=postgresql://localhost/gym

// config/database.config.ts
export const databaseConfig = () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
});

// Usage with validation
import { IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;
}
```

---

## Common Pitfalls

### 1. Forgetting to await Promises

```typescript
// ❌ Wrong
const user = this.userRepository.findById(id);
console.log(user.email);  // Cannot read property 'email' of Promise

// ✅ Correct
const user = await this.userRepository.findById(id);
console.log(user.email);  // Works!
```

### 2. Not Using Transactions

```typescript
// ❌ Wrong - Race conditions possible
async createMemberWithSubscription(data: CreateMemberDto) {
  const member = await this.memberRepository.save(data);
  const subscription = await this.subscriptionRepository.save({
    memberId: member.id,
    plan: data.plan,
  });
  return { member, subscription };
}

// ✅ Correct - Atomic operation
async createMemberWithSubscription(data: CreateMemberDto) {
  return await this.dataSource.transaction(async (manager) => {
    const member = await manager.save(Member, data);
    const subscription = await manager.save(Subscription, {
      memberId: member.id,
      plan: data.plan,
    });
    return { member, subscription };
  });
}
```

### 3. Exposing Sensitive Data

```typescript
// ❌ Wrong - Password in response
@Get(':id')
async getUser(@Param('id') id: string) {
  return this.userRepository.findById(id);  // Returns password!
}

// ✅ Correct - Use DTO
@Get(':id')
async getUser(@Param('id') id: string) {
  const user = await this.userRepository.findById(id);
  return new UserDto(user);  // Excludes password
}

// DTO
export class UserDto {
  @Exclude()  // Never serialize
  password: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;
}
```

### 4. N+1 Query Problem (GraphQL)

```typescript
// ❌ Wrong - N+1 queries
@ResolveField(() => [Booking])
async bookings(@Parent() member: Member) {
  // Runs query for EACH member (100 members = 100 queries!)
  return this.bookingRepository.findByMember(member.id);
}

// ✅ Correct - Use DataLoader
@ResolveField(() => [Booking])
async bookings(
  @Parent() member: Member,
  @Loader(BookingLoader) loader: DataLoader<string, Booking[]>,
) {
  // Batches all member IDs into ONE query
  return loader.load(member.id);
}
```

### 5. Not Validating Input

```typescript
// ❌ Wrong - No validation
@Post()
async create(@Body() data: any) {
  return this.memberRepository.save(data);  // SQL injection risk!
}

// ✅ Correct - Use class-validator
export class CreateMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;
}

@Post()
async create(@Body() data: CreateMemberDto) {
  return this.memberRepository.save(data);  // Validated!
}
```

### 6. Poor Error Handling

```typescript
// ❌ Wrong - Generic error
@Get(':id')
async getUser(@Param('id') id: string) {
  const user = await this.userRepository.findById(id);
  return user;  // Returns null if not found!
}

// ✅ Correct - Explicit error
@Get(':id')
async getUser(@Param('id') id: string) {
  const user = await this.userRepository.findById(id);

  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  return user;
}
```

### 7. Not Closing Database Connections

```typescript
// ❌ Wrong - Memory leak in tests
describe('UserService', () => {
  it('should create user', async () => {
    const service = new UserService(/* ... */);
    await service.create(userData);
    // Connection not closed!
  });
});

// ✅ Correct - Cleanup
describe('UserService', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({/* ... */}).compile();
  });

  afterEach(async () => {
    await module.close();  // Close connections
  });
});
```

### 8. Mixing Business Logic in Controllers

```typescript
// ❌ Wrong - Business logic in controller
@Post()
async registerMember(@Body() data: RegisterDto) {
  const existingUser = await this.memberRepository.findByEmail(data.email);
  if (existingUser) throw new ConflictException();

  const hashedPassword = await argon2.hash(data.password);
  const member = await this.memberRepository.save({
    ...data,
    password: hashedPassword,
  });

  await this.emailService.sendWelcome(member.email);
  return member;
}

// ✅ Correct - Business logic in service/command handler
@Post()
async registerMember(@Body() data: RegisterDto) {
  return this.commandBus.execute(new RegisterMemberCommand(data));
}
```

---

## Next Steps

### Phase 1: Setup (Week 1)
1. ✅ Initialize NestJS monorepo
2. ✅ Set up Docker services
3. ✅ Configure code quality tools
4. ✅ Create first domain (Membership)

### Phase 2: Core Features (Weeks 2-4)
1. Implement authentication (JWT + Passport)
2. Build CRUD operations for Members
3. Add GraphQL API
4. Write unit + integration tests

### Phase 3: Advanced Features (Weeks 5-8)
1. Add Scheduling service (Classes, Bookings)
2. Add Payment service (Subscriptions, Billing)
3. Implement RabbitMQ events
4. Create Notifications worker

### Phase 4: Production Ready (Weeks 9-12)
1. Add monitoring (logging, metrics)
2. Implement caching strategies
3. Add E2E tests
4. Performance optimization

---

## Learning Resources

### Official Docs
- **NestJS**: https://docs.nestjs.com
- **TypeORM**: https://typeorm.io
- **GraphQL**: https://graphql.org/learn

### DDD Resources
- **Book**: "Domain-Driven Design" by Eric Evans
- **Book**: "Implementing Domain-Driven Design" by Vaughn Vernon
- **Article**: https://martinfowler.com/tags/domain%20driven%20design.html

### Video Courses
- **NestJS Zero to Hero**: https://www.udemy.com/course/nestjs-zero-to-hero/
- **Docker for Developers**: https://www.udemy.com/course/docker-mastery/

---

## Support

If you get stuck:
1. Check NestJS Discord: https://discord.gg/nestjs
2. Check Stack Overflow: tag `nestjs`
3. Read error messages carefully (they're helpful!)
4. Use `console.log()` liberally (just remove before committing)

---

**Good luck on your full-stack journey! 🚀**

Remember: Every senior developer was once a beginner. Take it one step at a time, and you'll get there!
