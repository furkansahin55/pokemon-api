export const swaggerConfig = {
  swagger: {
    info: {
      title: 'Pokemon API',
      description: 'Pokemon API Documentation',
      version: '0.0.1'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'pokemons', description: 'Pokemons related endpoints' },
    ],
  }
};
