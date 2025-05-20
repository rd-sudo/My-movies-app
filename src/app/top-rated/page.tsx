"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { Movie } from "@/types/movie";

const TopRatedMoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopRatedMovies = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopRatedMovies(pageNumber);
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.page < data.total_pages);
    } catch {
      setError("Error cargando películas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTopRatedMovies(nextPage);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Top Rated Movies</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: "top-rated" },
            }}
            className="hover:scale-105 transition-transform"
          >
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              releaseYear={parseInt(movie.release_date?.substring(0, 4) || "0")}
              description={movie.overview}
            />
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRatedMoviesPage;
