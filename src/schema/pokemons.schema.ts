export const getAllSchema = {
  querystring: { $ref: "paginationSchema" },
  tags: ["pokemons"],
  description: "List all pokemons, paginated using a offset paginator.",
  response: {
    200: {
      type: "object",
      properties: {
        results: { type: "array", items: { $ref: "pokemonSchema#" } },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};

export const getSchema = {
  params: { $ref: "paramIdSchema" },
  tags: ["pokemons"],
  description:
    "Get a single pokemon by name or id (including its evolution names)",
  response: {
    200: { $ref: "pokemonSchema#" },
    404: { $ref: "messageResponseSchema#" },
  },
};
