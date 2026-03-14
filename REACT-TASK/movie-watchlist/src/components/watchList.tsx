interface Props {
  filter: string
  setFilter: (value: "All" | "Watched" | "To Watch") => void
}

export default function Filter({ filter, setFilter }: Props) {

  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value as any)}
      className="border p-2 rounded"
    >
      <option value="All">All</option>
      <option value="Watched">Watched</option>
      <option value="To Watch">To Watch</option>
    </select>
  )
}
