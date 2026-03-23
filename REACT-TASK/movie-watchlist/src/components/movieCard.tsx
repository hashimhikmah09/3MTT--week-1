// Import the Movie type from your types file
import type { Movie } from "../types"

// Define the props interface for the MovieCard component
interface Props {
  movie: Movie // The movie object to display
  onAdd?: (movie: Movie) => void // Optional function to add a movie
  onRemove?: (id: string) => void // Optional function to remove a movie by ID
  onToggle?: (id: string) => void // Optional function to toggle movie status
}

// Functional component that displays a movie card
export default function MovieCard({ movie, onAdd, onRemove, onToggle }: Props) {
  return (
    // Main container for the movie card with styling
    <div className="border p-3 rounded shadow bg-white text-center">

      {/* Display movie poster if available, otherwise show empty */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : ""}
        alt={movie.Title} // Accessibility: describes the image
        className="w-32 h-48 object-cover mx-auto mb-2"
      />

      {/* Display movie title */}
      <h3 className="font-bold">{movie.Title}</h3>

      {/* Display movie release year */}
      <p className="text-sm text-gray-500">{movie.Year}</p>

      {/* Show movie status only if it exists */}
      {movie.status && (
        <p className="text-sm mt-1">
          Status: <span className="font-semibold">{movie.status}</span>
        </p>
      )}

      {/* Container for action buttons */}
      <div className="flex gap-2 justify-center mt-2">

        {/* Show "Add" button only if onAdd function is provided */}
        {onAdd && (
          <button
            onClick={() => onAdd(movie)} // Call onAdd with movie object
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        )}

        {/* Show "Remove" button only if onRemove function is provided */}
        {onRemove && (
          <button
            onClick={() => onRemove(movie.imdbID)} // Call onRemove with movie ID
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        )}

        {/* Show "Toggle Status" button only if onToggle function is provided */}
        {onToggle && (
          <button
            onClick={() => onToggle(movie.imdbID)} // Call onToggle with movie ID
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Toggle Status
          </button>
        )}

      </div>
    </div>
  )
}
