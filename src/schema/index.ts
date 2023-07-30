import { FastifyInstance } from "fastify";
import {
  messageSchema,
  paginationSchema,
  paramIdSchema,
} from "./common.schema";
import {
  pokemonDimensionSchema,
  pokemonAttackItemSchema,
  pokemonAttackSchema,
  pokemonEvolutionRequirementsSchema,
  evolutionsSchema,
  pokemonSchema,
} from "./models.schema";

export const addSchemas = function (app: FastifyInstance) {
  app.addSchema(paginationSchema);
  app.addSchema(paramIdSchema);
  app.addSchema(messageSchema);

  app.addSchema(pokemonDimensionSchema);
  app.addSchema(pokemonAttackItemSchema);
  app.addSchema(pokemonAttackSchema);
  app.addSchema(pokemonEvolutionRequirementsSchema);
  app.addSchema(evolutionsSchema);
  app.addSchema(pokemonSchema);
};
