import { request, gql } from "graphql-request";
import { GraphqlGetPokemons, GraphqlGetPokemon } from "types/graphql";
import { app } from "../app";

async function getPokemons(offset: number, limit: number) {
  const query = gql`
        query {
            pokemons(first: ${limit + offset}) {
                id
                number
                name
                weight {
                minimum
                maximum
                }
                height {
                minimum
                maximum
                }
                classification
                types
                resistant
                attacks {
                fast {
                    name
                    type
                    damage
                }
                special {
                    name
                    type
                    damage
                }
                }
                weaknesses
                fleeRate
                maxCP
                evolutions {
                name
                }
                evolutionRequirements{
                amount
                name
                }
                maxHP
                image
            }
        }
    `;
  const data: GraphqlGetPokemons = await request(
    app.config.GRAPHQL_ENDPOINT,
    query
  );

  return data.pokemons.slice(offset, offset + limit);
}

async function getPokemon(name: string) {
  const pokemon = await app.prisma.pokemon.findUnique({
    where: { name: name },
    include: {
      weight: true,
      height: true,
      attacks: { include: { fast: true, special: true } },
      evolutions: true,
      evolutionRequirements: true,
    },
  });

  // If pokemon exists in database, return it
  if (pokemon) return pokemon;

  const query = gql`
        query {
            pokemon(name: "${name}"){
                id
              number
              name
              weight {
                minimum
                maximum
              }
              height {
                minimum
                maximum
              }
              classification
              types
              resistant
              attacks {
                fast {
                  name
                  type
                  damage
                }
                special {
                  name
                  type
                  damage
                }
              }
              weaknesses
              fleeRate
              maxCP
              evolutions {
                name
              }
              evolutionRequirements{
                amount
                name
              }
              maxHP
              image
          
            }
        }
    `;
  const result: GraphqlGetPokemon = await request(
    app.config.GRAPHQL_ENDPOINT,
    query
  );

  if (!result.pokemon) return null;

  await app.prisma.pokemon.create({
    data: {
      ...result.pokemon,
      weight: result.pokemon.weight
        ? {
            create: result.pokemon.weight,
          }
        : undefined,
      height: result.pokemon.height
        ? {
            create: result.pokemon.height,
          }
        : undefined,
      attacks: {
        create: {
          fast: result.pokemon.attacks.fast
            ? {
                createMany: { data: result.pokemon.attacks.fast },
              }
            : undefined,
          special: result.pokemon.attacks.special
            ? {
                createMany: { data: result.pokemon.attacks.special },
              }
            : undefined,
        },
      },
      evolutionRequirements: result.pokemon.evolutionRequirements
        ? {
            create: result.pokemon.evolutionRequirements,
          }
        : undefined,
      evolutions: result.pokemon.evolutions
        ? {
            createMany: { data: result.pokemon.evolutions },
          }
        : undefined,
    },
  });

  return result.pokemon;
}

export default {
  getPokemons,
  getPokemon,
};
