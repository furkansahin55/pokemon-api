import { PrismaClient } from "@prisma/client";
import { FastifyBaseLogger } from "fastify/types/logger";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    config: {
      NODE_ENV: "development" | "production" | "test";
      BIND_PORT: number;
      BIND_ADDR: string;
      PROJECT_NAME: string;
      APP_SERVER_NAME: string;
      DATABASE_URL: string;
      ENABLE_SWAGGER: boolean;
      GRAPHQL_ENDPOINT: string;
    };
    log: FastifyBaseLogger;
  }
}
