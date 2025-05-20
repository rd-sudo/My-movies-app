import api from "../api";
import type { Movie } from "@/types/movie";

export const getMovieById = async (id: number): Promise<Movie> => {
  try {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
