import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import fastifyMetrics from "fastify-metrics";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import envConfig from "./config/env.config";
import corsConfig from "./config/cors.config";
import loggerConfig from "./config/logger.config";
import prismaPlugin from "./plugins/prisma.plugin";
import { swaggerConfig } from "./config/swagger.config";

import { pokemonsRoutes } from "./routes";
import { addSchemas } from "./schema";

const app = fastify({ logger: loggerConfig });

const main = async () => {
  // Now we setup our app, plugins and such
  await app.register(fastifyMetrics, { endpoint: '/metrics' });
  await app.register(fastifyEnv, envConfig);
  await app.register(fastifyCors, corsConfig);
  await app.register(prismaPlugin);

  // add schemas
  addSchemas(app);

  // Swagger Docs
  if (app.config.ENABLE_SWAGGER) {
    await app.register(fastifySwagger, swaggerConfig);
    await app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
    });
  }

  // API Endpoint routes
  await app.register(
    async (api) => {
      api.register(pokemonsRoutes, { prefix: "/pokemons" });
    },
    { prefix: "/api/v1" }
  );
  return app;
};

export { main, app };
