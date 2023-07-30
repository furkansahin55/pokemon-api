interface Evolutions {
  name: string;
}

interface PokemonDimension {
  minimum: string;
  maximum: string;
}

interface PokemonAttackItem {
  name: string;
  type: string;
  damage: number;
}

interface PokemonAttack {
  fast: PokemonAttackItem[];
  special: PokemonAttackItem[];
}

interface PokemonEvolutionRequirements {
  amount: number;
  name: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: PokemonAttack;
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: Evolutions[];
  evolutionRequirements: PokemonEvolutionRequirements;
  maxHP: number;
  image: string;
}

export interface GraphqlGetPokemons {
  pokemons: Pokemon[];
}

export interface GraphqlGetPokemons {
  pokemons: Pokemon[];
}

export interface GraphqlGetPokemon {
  pokemon: Pokemon;
}