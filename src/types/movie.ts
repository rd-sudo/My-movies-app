import { ReactNode } from "react";

export interface Movie {
  genres: Genre[];
  runtime: ReactNode;
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}
