// Define a reusable type for filter values
type FilterType = "All" | "Watched" | "To Watch"

// Define the props interface for the Filter component
interface Props {
  filter: FilterType // Current selected filter value
  setFilter: (value: FilterType) => void // Function to update the filter
}

// Functional component for filtering movies
export default function Filter({ filter, setFilter }: Props) {

  return (
    // Dropdown select input for choosing filter type
    <select
      value={filter} // Controlled component: reflects current filter state
      onChange={(e) => setFilter(e.target.value as FilterType)} 
      // Now properly typed instead of using "any"
      className="border p-2 rounded"
    >
      {/* Option to show all movies */}
      <option value="All">All</option>

      {/* Option to show only watched movies */}
      <option value="Watched">Watched</option>

      {/* Option to show movies yet to be watched */}
      <option value="To Watch">To Watch</option>
    </select>
  )
}
