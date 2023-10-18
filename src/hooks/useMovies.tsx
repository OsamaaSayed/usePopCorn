import { useState, useEffect } from 'react';

import { IMovieData } from '../models/movie';

export const useMovies = (query: string, handleCloseMovie: () => void) => {
  const [movies, setMovies] = useState<IMovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${
            import.meta.env.VITE_API_KEY
          }`,
          { signal: controller.signal },
        );

        //! res.ok is always true , even if there was an error in the request
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies!');

        const data = await res.json();
        if (data?.Response === 'False') throw new Error(data?.Error);

        setMovies(data?.Search);

        return () => {
          controller.abort();
        };
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError')
          setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, handleCloseMovie]);

  return { movies, isLoading, error };
};
