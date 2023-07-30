import { FastifyInstance } from "fastify";

import { getPokemons, getPokemon } from "../controllers/pokemons.controller";
import { getAllSchema, getSchema } from "../schema/pokemons.schema";

export const pokemonsRoutes = async function (fastify: FastifyInstance) {
  // List all pokemons
  fastify.get("/", { schema: getAllSchema }, getPokemons);

  // Get one pokemon by name or id
  fastify.get("/:name", { schema: getSchema }, getPokemon);
};
