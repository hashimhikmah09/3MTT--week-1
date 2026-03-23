// Reusable filter/status type
export type FilterType = "All" | "Watched" | "To Watch"

// Movie interface
export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
  status?: Exclude<FilterType, "All"> // Only "Watched" | "To Watch"
}
