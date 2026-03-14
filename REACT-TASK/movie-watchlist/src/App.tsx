import { useEffect, useState } from "react"
import axios from "axios"
import MovieList from "./components/movieList"
import Filter from "./components/watchList"
import type { Movie } from "./types"

const API_KEY = "10501f87"

function App() {

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [filter, setFilter] = useState<"All" | "Watched" | "To Watch">("All")

  // Load localStorage
  useEffect(() => {
    const stored = localStorage.getItem("watchlist")
    if (stored) setWatchlist(JSON.parse(stored))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  const searchMovies = async () => {

    if (!query) return

    try {

      const res = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      )

      if (res.data.Search) {
        setMovies(res.data.Search)
      } else {
        setMovies([])
      }

    } catch (error) {
      console.error(error)
    }
  }

  const addMovie = (movie: Movie) => {

    if (!watchlist.find(m => m.imdbID === movie.imdbID)) {

      setWatchlist([
        { ...movie, status: "To Watch" },
        ...watchlist
      ])

    }
  }

  const removeMovie = (id: string) => {
    setWatchlist(watchlist.filter(m => m.imdbID !== id))
  }

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

  const filteredWatchlist =
    filter === "All"
      ? watchlist
      : watchlist.filter(m => m.status === filter)

  return (

    <div className="max-w-6xl mx-auto p-4">

      <h1 className="text-3xl text-green-500 font-bold text-center mb-6">
        Movie Watchlist
      </h1>

      {/* Search */}
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

      {/* Results */}
      <h2 className="text-xl font-semibold mb-3">Search Results</h2>
      <MovieList movies={movies} onAdd={addMovie} />

      {/* Watchlist */}
      <div className="flex justify-between items-center mt-8 mb-3">

        <h2 className="text-xl font-semibold">My Watchlist</h2>

        <Filter filter={filter} setFilter={setFilter} />

      </div>

      <MovieList
        movies={filteredWatchlist}
        onRemove={removeMovie}
        onToggle={toggleStatus}
      />

    </div>
  )
}

export default App
