# Iot-task

A robust Node.js application utilizing Prisma with a PostgreSQL database, designed with a modular architecture and enhanced with the power of NX Console.

## Features

- **Prisma ORM**: A powerful ORM layer to interact with Postgres, defined by a straightforward Prisma schema.
- **Modular Architecture**: Each module (device, user, geofence) has its own set of services, controllers, routes, and DTO files.
- **Class-based Design**: Implemented OOP principles with classes for most components, enhancing code reusability and scalability.
- **NX Console Integration**: Leverage NX tools to boost productivity in the development cycle.

## Directory Structure

```plaintext
src/
│
├── database/
│   ├── prisma-service
│   └── repo/
│       ├── user
│       ├── device
│       └── geofence
│
├── lib/
│   ├── api/
│   │   ├── shared/
│   │   │   ├── middleware
│   │   │   ├── service
│   │   │   └── response
│   │   └── config
│   └── utils/
│       ├── routes
│       ├── sentry
│       ├── socket
│       └── server
│
└── modules/
    └── resources/
        ├── device
        ├── user
        └── geofence
```

## Getting Started

- **1- Setup Prisma:**
  Ensure you have Prisma CLI installed:

```bash
npm install -g prisma
```

Configure your .env file with DATABASE_URL pointing to your PostgreSQL instance.
Then, run the following to generate Prisma Client:

- **2- Generate Prisma and Migrate:**
  This command line will help you to migrate and generate the types for your DB:

```bash
prisma db push dev
```

- **3- Install Dependencies:**

```bash
yarn install
```

- **3- Run The App:**
  Use `NX` to execute the app:

```bash
nx serve iot-task
```

## Modules

Modules has `resources` folder, inside of it we have all resources we are working with,
every single one of these resources has bunch of files: `service`, `controller`, `route`, `dto`, and `module`:

- **1- User:**

  - `user.service.ts:` this file using to handle all services for using that might be used in the `controller` file.
  - `user.controller.ts:` this file using to handle all endpoint function calls, injected with `service` file.
  - `user.route.ts`: this file using to declare all possible endpoints for `user`, and it's injected with the `controller` and `middleware` files.
  - `user.module.ts`: this file using to link and inject all classes together `-dependency injection-`.
  - `create.dto.ts`: this file using to declare the validations for the request body data.

- **1- Device:**

  - `device.service.ts:` this file using to handle all services for using that might be used in the `controller` file.
  - `device.controller.ts:` this file using to handle all endpoint function calls, injected with `service` file.
  - `device.route.ts`: this file using to declare all possible endpoints for `device`, and it's injected with the `controller` and `middleware` files.
  - `device.module.ts`: this file using to link and inject all classes together `-dependency injection-`.
  - `create.dto.ts`: this file using to declare the validations for the request body data.

- **1- Geofence:**
  - `geofence.service.ts:` this file using to handle all services for using that might be used in the `controller` file.
  - `geofence.controller.ts:` this file using to handle all endpoint function calls, injected with `service` file.
  - `geofence.route.ts`: this file using to declare all possible endpoints for `geofence`, and it's injected with the `controller` and `middleware` files.
  - `geofence.module.ts`: this file using to link and inject all classes together `-dependency injection-`.
  - `create.dto.ts`: this file using to declare the validations for the request body data.

## Utils

Utils for `sockets`, `server`, `routes` and `sentry`, There we are preparing the app by split all services using to small utils.
