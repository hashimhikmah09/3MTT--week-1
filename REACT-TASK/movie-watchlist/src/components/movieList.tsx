import type { Movie } from "../types"
import MovieCard from "./movieCard"

interface Props {
  movies: Movie[]
  onAdd?: (movie: Movie) => void
  onRemove?: (id: string) => void
  onToggle?: (id: string) => void
}

export default function MovieList({ movies, onAdd, onRemove, onToggle }: Props) {

  if (movies.length === 0) {
    return <p className="text-gray-500">No movies found</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {movies.map(movie => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onAdd={onAdd}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}

    </div>
  )
}
