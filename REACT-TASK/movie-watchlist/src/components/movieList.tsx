import type { Movie } from "../types"
import MovieCard from "./movieCard"

// Reuse the same filter type
type FilterType = "All" | "Watched" | "To Watch"

// Define the props interface for the MovieList component
interface Props {
  movies: Movie[]
  filter: FilterType // Current selected filter
  onAdd?: (movie: Movie) => void
  onRemove?: (id: string) => void
  onToggle?: (id: string) => void
}

export default function MovieList({ movies, filter, onAdd, onRemove, onToggle }: Props) {

  // Filter movies based on selected filter
  const filteredMovies = movies.filter((movie) => {
    if (filter === "All") return true // Show all movies
    return movie.status === filter // Match movie status with filter
  })

  // If no movies after filtering, show message
  if (filteredMovies.length === 0) {
    return <p className="text-gray-500">No movies found</p>
  }

  return (
    // Grid layout for displaying multiple movie cards
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {/* Loop through filtered movies */}
      {filteredMovies.map(movie => (
        <MovieCard
          key={movie.imdbID} // Unique key for React
          movie={movie}
          onAdd={onAdd}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}

    </div>
  )
}
