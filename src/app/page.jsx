"use client";
import { typeColors } from "@/app/constants/colors";
import { PokemonContext } from "@/context/PokemonContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const PokemonList = () => {
  const {
    pokemons,
    loading,
    page,
    setPage,
    setSearchTerm,
    setSortBy,
    searchTerm,
    sortBy,
  } = useContext(PokemonContext);

  const router = useRouter();

  // Logs the Pokemon list whenever the page changes
  useEffect(() => {
    console.log(pokemons);
  }, [page, setPage]);

  // Show loading text while Pokemon data is being fetched
  if (loading)
    return (
      <p className="text-center text-xl font-semibold mt-10">Loading...</p>
    );

  return (
    <>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white px-4 py-6 h-[calc(100vh-70px)] overflow-auto">
        {/* App Title */}
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Pokemon Explorer
        </h1>

        {/* Search & Sorting Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full sm:w-64 rounded border shadow bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="px-4 py-2 rounded border shadow bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="exp-asc">Base Experience (Low-High)</option>
            <option value="exp-desc">Base Experience (High-Low)</option>
          </select>
        </div>

        {/* Pokemon Cards Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center transform transition hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/pokemon/${pokemon.name}`)} // Navigate to Pokemon details page
            >
              {/* Pokemon Image */}
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24"
              />
              {/* Pokemon Name */}
              <h3 className="text-lg font-semibold mt-2">
                {pokemon.name.toUpperCase()}
              </h3>
              {/* Pokemon Types */}
              <div className="flex gap-2 mt-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded text-white text-sm ${typeColors[type.type.name]} dark:bg-opacity-80`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-4">
          {/* Previous Page Button */}
          <button
            disabled={page === 1} // Disable button on the first page
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:bg-gray-400 dark:bg-blue-600 dark:hover:bg-blue-500 dark:disabled:bg-gray-700"
          >
            Previous
          </button>

          {/* Current Page Number */}
          <span className="text-lg font-semibold dark:text-white">
            Page {page}
          </span>

          {/* Next Page Button */}
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
