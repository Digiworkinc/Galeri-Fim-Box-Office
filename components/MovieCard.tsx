
import React from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
      <div className="relative">
        <img 
          src={movie.posterUrl} 
          alt={`Poster for ${movie.title}`} 
          className="w-full h-96 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
           <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
             {movie.genre}
           </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white truncate group-hover:text-blue-400 transition-colors duration-300" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-sm text-slate-400 mb-2">{movie.year}</p>
        <p className="text-sm text-slate-300 h-20 overflow-hidden">
          {movie.description}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
