import api from "../api";

import type { Movie } from "@/types/movie";
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export const getPopularMovies = async (page = 1): Promise<MoviesResponse> => {
  const endpoint = `/movie/popular?language=en-US&page=${page}`;
  try {
    const { data } = await api.get<MoviesResponse>(endpoint);
    return data;
  } catch (error) {
    throw new Error(
      (error as { response?: { data?: { status_message?: string } } })?.response
        ?.data?.status_message || "Error fetching popular movies"
    );
  }
};
