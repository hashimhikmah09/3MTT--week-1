export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
  status?: "Watched" | "To Watch"
}
