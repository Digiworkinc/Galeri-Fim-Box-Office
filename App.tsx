
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchMoviesFromAPI } from './services/geminiService';
import type { Movie, MovieFromAPI } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const moviesFromApi: MovieFromAPI[] = await fetchMoviesFromAPI();
      const moviesWithPosters: Movie[] = moviesFromApi.map((movie, index) => ({
        ...movie,
        posterUrl: `https://picsum.photos/500/750?random=${index + 1}`
      }));
      setAllMovies(moviesWithPosters);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMovies = useMemo(() => {
    if (!searchTerm) {
      return allMovies;
    }
    return allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allMovies, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <div className="mt-8">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchMovies} />
          ) : (
            <MovieGrid movies={filteredMovies} />
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Ditenagai oleh Gemini API. Gambar poster adalah placeholder.</p>
      </footer>
    </div>
  );
};

export default App;
