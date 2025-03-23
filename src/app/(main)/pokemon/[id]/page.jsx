"use client";
import { typeColors } from "@/app/constants/colors";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Ensure 'id' exists before fetching data

    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        console.log(data);

        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold mt-10 dark:text-white">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10 dark:text-red-400">
        {error}
      </p>
    );
  if (!pokemon)
    return (
      <p className="text-center mt-10 dark:text-white">Pokemon not found</p>
    );

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 px-4 py-6 h-[calc(100vh-70px)]">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10 text-center dark:border dark:border-gray-700">
        {/* Pokemon Image */}
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-48 sm:w-60 md:w-72 mx-auto"
        />

        {/* Pokemon Name */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 uppercase">
          {pokemon.name}
        </h1>

        {/* Pokemon Types */}
        <div className="flex justify-center gap-2 mt-3">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-4 py-1 rounded text-white text-sm ${typeColors[type.type.name]} dark:bg-opacity-80`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        {/* Abilities Section */}
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6">
          Abilities
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.abilities.map((ability) => (
            <span
              key={ability.ability.name}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 text-sm"
            >
              {ability.ability.name}
            </span>
          ))}
        </div>

        {/* Stats Section */}
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6">
          Base Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          {pokemon.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded text-gray-700 dark:text-gray-300 text-sm"
            >
              {stat.stat.name.toUpperCase()}:{" "}
              <span className="font-bold">{stat.base_stat}</span>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition-all dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default Page;
