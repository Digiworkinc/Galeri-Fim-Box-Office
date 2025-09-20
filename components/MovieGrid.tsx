
import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-slate-300">Tidak Ada Film yang Ditemukan</h2>
        <p className="text-slate-400 mt-2">Coba kata kunci pencarian yang berbeda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.title + movie.year} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
