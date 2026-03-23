import { useEffect, useState } from "react"
import axios from "axios"
import MovieList from "./components/movieList"
import Filter from "./components/filter" // ✅ FIXED: correct file
import type { Movie } from "./types"

const API_KEY = "10501f87"

function App() {

  // State for search input
  const [query, setQuery] = useState("")

  // State for API search results
  const [movies, setMovies] = useState<Movie[]>([])

  // State for user's saved watchlist
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  // State for filtering watchlist
  const [filter, setFilter] = useState<"All" | "Watched" | "To Watch">("All")

  // Load watchlist from localStorage when app loads
  useEffect(() => {
    const stored = localStorage.getItem("watchlist")
    if (stored) setWatchlist(JSON.parse(stored))
  }, [])

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  // Fetch movies from OMDB API
  const searchMovies = async () => {

    if (!query) return // Prevent empty search

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      )

      // If API returns movies, update state
      if (res.data.Search) {
        setMovies(res.data.Search)
      } else {
        setMovies([]) // No results found
      }

    } catch (error) {
      console.error(error)
    }
  }

  // Add movie to watchlist
  const addMovie = (movie: Movie) => {

    // Prevent adding duplicate movies
    if (!watchlist.find(m => m.imdbID === movie.imdbID)) {

      setWatchlist([
        { ...movie, status: "To Watch" }, // Default status
        ...watchlist
      ])

    }
  }

  // Remove movie from watchlist
  const removeMovie = (id: string) => {
    setWatchlist(watchlist.filter(m => m.imdbID !== id))
  }

  // Toggle movie status (Watched <-> To Watch)
  const toggleStatus = (id: string) => {

    setWatchlist(
      watchlist.map(movie =>
        movie.imdbID === id
          ? {
              ...movie,
              status: movie.status === "Watched" ? "To Watch" : "Watched"
            }
          : movie
      )
    )
  }

  // ✅ FIXED FILTER LOGIC (cleaner version)
  const filteredWatchlist = watchlist.filter(
    (m) => filter === "All" || m.status === filter
  )

  return (

    <div className="max-w-6xl mx-auto p-4">

      {/* App Title */}
      <h1 className="text-3xl text-green-500 font-bold text-center mb-6">
        Movie Watchlist
      </h1>

      {/* Search Section */}
      <div className="flex gap-2 mb-6">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="border p-2 flex-1 rounded-lg"
        />

        <button
          onClick={searchMovies}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>

      </div>

      {/* Search Results */}
      <h2 className="text-xl font-semibold mb-3">Search Results</h2>

      {/* Pass movies + add function */}
      <MovieList movies={movies} onAdd={addMovie} filter={"All"} />

      {/* Watchlist Header + Filter */}
      <div className="flex justify-between items-center mt-8 mb-3">

        <h2 className="text-xl font-semibold">My Watchlist</h2>

        {/* Filter dropdown */}
        <Filter filter={filter} setFilter={setFilter} />

      </div>

      {/* Filtered Watchlist */}
      <MovieList
        movies={filteredWatchlist}
        onRemove={removeMovie}
        onToggle={toggleStatus} filter={"All"}      />

    </div>
  )
}

export default App
