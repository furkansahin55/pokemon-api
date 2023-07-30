-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "types" TEXT[],
    "resistant" TEXT[],
    "weaknesses" TEXT[],
    "fleeRate" DOUBLE PRECISION NOT NULL,
    "maxCP" INTEGER NOT NULL,
    "maxHP" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PokemonDimension" (
    "id" TEXT NOT NULL,
    "minimum" TEXT NOT NULL,
    "maximum" TEXT NOT NULL,
    "weightPokemonName" TEXT,
    "heightPokemonName" TEXT,

    CONSTRAINT "PokemonDimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evolution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preEvolutionName" TEXT NOT NULL,

    CONSTRAINT "Evolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonAttack" (
    "id" TEXT NOT NULL,
    "pokemonName" TEXT NOT NULL,

    CONSTRAINT "PokemonAttack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "damage" INTEGER NOT NULL,
    "pokemonFastAttackId" TEXT,
    "pokemonSpecialAttackId" TEXT,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvolutionRequirements" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonName" TEXT NOT NULL,

    CONSTRAINT "EvolutionRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PokemonDimension_weightPokemonName_key" ON "PokemonDimension"("weightPokemonName");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonDimension_heightPokemonName_key" ON "PokemonDimension"("heightPokemonName");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonAttack_pokemonName_key" ON "PokemonAttack"("pokemonName");

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionRequirements_pokemonName_key" ON "EvolutionRequirements"("pokemonName");

-- AddForeignKey
ALTER TABLE "PokemonDimension" ADD CONSTRAINT "PokemonDimension_weightPokemonName_fkey" FOREIGN KEY ("weightPokemonName") REFERENCES "Pokemon"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonDimension" ADD CONSTRAINT "PokemonDimension_heightPokemonName_fkey" FOREIGN KEY ("heightPokemonName") REFERENCES "Pokemon"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evolution" ADD CONSTRAINT "Evolution_preEvolutionName_fkey" FOREIGN KEY ("preEvolutionName") REFERENCES "Pokemon"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonAttack" ADD CONSTRAINT "PokemonAttack_pokemonName_fkey" FOREIGN KEY ("pokemonName") REFERENCES "Pokemon"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_pokemonFastAttackId_fkey" FOREIGN KEY ("pokemonFastAttackId") REFERENCES "PokemonAttack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_pokemonSpecialAttackId_fkey" FOREIGN KEY ("pokemonSpecialAttackId") REFERENCES "PokemonAttack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvolutionRequirements" ADD CONSTRAINT "EvolutionRequirements_pokemonName_fkey" FOREIGN KEY ("pokemonName") REFERENCES "Pokemon"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
