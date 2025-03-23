"use client";
import { createContext, useEffect, useState } from "react";

// Creating a context for Pokemon data
export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  // State variables
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch Pokemon data whenever the page or sorting criteria changes
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const offset = (page - 1) * limit; // Calculate the offset based on the page number
      try {
        // Fetch basic Pokemon data (name & URL for details)
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();
  
        // Fetch additional details (sprites, types, base experience, etc.)
        let detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
  
        // Apply sorting immediately after fetching new data
        if (sortBy === "name-asc") {
          detailedPokemons.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "name-desc") {
          detailedPokemons.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === "exp-asc") {
          detailedPokemons.sort((a, b) => a.base_experience - b.base_experience);
        } else if (sortBy === "exp-desc") {
          detailedPokemons.sort((a, b) => b.base_experience - a.base_experience);
        }
  
        setPokemons(detailedPokemons); 
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPokemons();
  }, [page, sortBy]); 

  
  // Apply search filter whenever `pokemons` or `searchTerm` changes
  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
    );

    setFilteredPokemons(filtered); 
  }, [searchTerm, pokemons]); 

  return (
    <PokemonContext.Provider
      value={{
        pokemons: filteredPokemons, 
        loading, 
        page, 
        setPage, 
        setSearchTerm, 
        setSortBy, 
        searchTerm, 
        sortBy, 
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
