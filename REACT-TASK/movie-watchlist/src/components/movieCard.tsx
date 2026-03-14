import  type { Movie } from "../types"

interface Props {
  movie: Movie
  onAdd?: (movie: Movie) => void
  onRemove?: (id: string) => void
  onToggle?: (id: string) => void
}

export default function MovieCard({ movie, onAdd, onRemove, onToggle }: Props) {
  return (
    <div className="border p-3 rounded shadow bg-white text-center">

      <img
        src={movie.Poster !== "N/A" ? movie.Poster : ""}
        alt={movie.Title}
        className="w-32 h-48 object-cover mx-auto mb-2"
      />

      <h3 className="font-bold">{movie.Title}</h3>
      <p className="text-sm text-gray-500">{movie.Year}</p>

      {movie.status && (
        <p className="text-sm mt-1">
          Status: <span className="font-semibold">{movie.status}</span>
        </p>
      )}

      <div className="flex gap-2 justify-center mt-2">

        {onAdd && (
          <button
            onClick={() => onAdd(movie)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(movie.imdbID)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        )}

        {onToggle && (
          <button
            onClick={() => onToggle(movie.imdbID)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Toggle Status
          </button>
        )}

      </div>
    </div>
  )
}
