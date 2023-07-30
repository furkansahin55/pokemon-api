import { FastifyRequest, FastifyReply } from "fastify";
import PokemonService from "../services/pokemons.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export async function getPokemons(
  request: FastifyRequest<CrudAllRequest>,
  reply: FastifyReply
) {
  const { offset, limit } = request.query;

  let results;
  try {
    results = await PokemonService.getPokemons(offset, limit);
  } catch (error) {
    request.log.error(error);
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
  return reply.status(200).send({ results });
}

export async function getPokemon(
  request: FastifyRequest<CrudIdRequest>,
  reply: FastifyReply
) {
  const { name } = request.params;

  let result;
  try {
    result = await PokemonService.getPokemon(name);
  } catch (error) {
    request.log.error(error);
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  if (!result) {
    return reply.status(404).send({ message: "Not found" });
  }
  return reply.status(200).send(result);
}
