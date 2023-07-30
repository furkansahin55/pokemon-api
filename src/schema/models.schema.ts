export const evolutionsSchema = {
  $id: "evolutionsSchema",
  type: "object",
  properties: {
    name: { type: "string" },
  },
};

export const pokemonDimensionSchema = {
  $id: "pokemonDimensionSchema",
  type: "object",
  properties: {
    minimum: { type: "string" },
    maximum: { type: "string" },
  },
};

export const pokemonAttackItemSchema = {
  $id: "pokemonAttackItemSchema",
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    damage: { type: "number" },
  },
};

export const pokemonAttackSchema = {
  $id: "pokemonAttackSchema",
  type: "object",
  properties: {
    fast: { type: "array", items: { $ref: "pokemonAttackItemSchema#" } },
    special: { type: "array", items: { $ref: "pokemonAttackItemSchema#" } },
  },
};

export const pokemonEvolutionRequirementsSchema = {
  $id: "pokemonEvolutionRequirementsSchema",
  type: "object",
  nullable: true,
  properties: {
    amount: { type: "number" },
    name: { type: "string" },
    required: false,
  },
};

export const pokemonSchema = {
  $id: "pokemonSchema",
  type: "object",
  properties: {
    id: { type: "string" },
    number: { type: "string" },
    name: { type: "string" },
    weight: { $ref: "pokemonDimensionSchema#" },
    height: { $ref: "pokemonDimensionSchema#" },
    classification: { type: "string" },
    types: { type: "array", items: { type: "string" } },
    resistant: { type: "array", items: { type: "string" } },
    attacks: { $ref: "pokemonAttackSchema#" },
    weaknesses: { type: "array", items: { type: "string" } },
    fleeRate: { type: "number" },
    maxCP: { type: "number" },
    evolutionRequirements: { $ref: "pokemonEvolutionRequirementsSchema#" },
    evolutions: {
      type: "array",
      nullable: true,
      items: { $ref: "evolutionsSchema#" },
    },
    maxHP: { type: "number" },
    image: { type: "string" },
  },
};
