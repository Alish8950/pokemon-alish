# Pokemon Explorer App

## Introduction

The **Pokemon Explorer App** is a web application built using **Next.js** that allows users to browse Pokémon, view their details, and filter/search based on different criteria. The app fetches data from the **PokeAPI** and presents a clean and interactive UI for a seamless browsing experience.

## Features

- **Pokemon List Page**: Displays a paginated list of Pokémon.
- **Pokemon Detail Page**: Shows detailed stats, abilities, and types for a selected Pokémon.
- **Search Functionality**: Allows users to search for Pokémon by name.
- **Sorting Feature**: Users can sort Pokémon by name or experience.
- **Dark Mode Support**: The UI adapts to dark mode themes.
- **Responsive Design**: Works seamlessly across different screen sizes.

## Technologies Used

- **Next.js**: For building the React-based frontend.
- **React Hooks**: Used for state management.
- **Tailwind CSS**: For styling and responsiveness.
- **PokeAPI**: The API source for Pokémon data.


## Code Explanation

### 1. **Pokemon Detail Page** (pages/[id].js)

This component fetches detailed data of a Pokémon using its **id** from the URL.

- **State Management**:

  - `pokemon`: Stores fetched Pokémon details.
  - `loading`: Controls loading state.
  - `error`: Stores error messages if the API fails.

- **Fetching Data**:

  - The `useEffect` hook triggers the API call when the component loads or when `id` changes.
  - Pokémon details are fetched from `https://pokeapi.co/api/v2/pokemon/${id}`.
  - Errors are handled using `try-catch`.

- **Rendering**:

  - Displays the Pokémon's image, name, types, abilities, and base stats.
  - A "Back to List" button allows navigation to the previous page.

### 2. **Pokemon Context Provider** (context/PokemonContext.js)

The `PokemonProvider` manages global state for Pokémon data.

- **State Variables**:

  - `pokemons`: Stores the list of Pokémon.
  - `filteredPokemons`: Stores Pokémon after applying filters.
  - `searchTerm`: Stores the current search input.
  - `sortBy`: Stores sorting preference.
  - `loading`: Indicates whether data is being fetched.
  - `page`: Keeps track of pagination.

- **Fetching Data**:

  - The `useEffect` hook fetches Pokémon data whenever the page or sorting preference changes.
  - It fetches **basic Pokémon data** and then retrieves additional details like sprites, types, and base experience.

- **Filtering and Sorting**:

  - Sorting is applied immediately after fetching data.
  - A second `useEffect` handles filtering based on search input.

- **Context Provider**:

  - Exposes `pokemons`, `loading`, `page`, `setPage`, `setSearchTerm`, and `setSortBy` to be used in other components.

### 3. **Header Component** (components/Header.js)

- Displays the **app logo** and the title "Pokemon Explorer App".
- Uses the `next/image` component for optimized image loading.

## Installation & Running Locally

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

### Steps to Run

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/pokemon-explorer.git
   cd pokemon-explorer
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Open the app in your browser:**
   ```
   http://localhost:3000
   ```

## Future Improvements

- **Infinite Scrolling** for smoother navigation.
- **Favorite Pokémon Feature** to allow users to save Pokémon.
- **Improved UI Animations** for a more engaging experience.

## Conclusion

The Pokémon Explorer App is a simple yet powerful tool to browse Pokémon interactively. With the integration of Next.js, React, and PokeAPI, it provides a fast and responsive experience for users.

---

**Author:** Alish
**GitHub:** [Your GitHub Profile](https://github.com/your-profile)

