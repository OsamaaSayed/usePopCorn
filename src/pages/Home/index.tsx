import { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import NumResults from '../../components/NumResults';
import SearchInput from '../../components/shared/SearchInput';
import Logo from '../../components/Logo';
import Box from '../../components/shared/Box';
import MovieList from '../../components/MovieList';
import WatchedSummary from '../../components/WatchedSummary';
import WatchedMovieList from '../../components/WatchedList';
import Loader from '../../components/shared/Loader';
import ErrorMessage from '../../components/shared/ErrorMessage';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

import { IMovieData, IWatchedMovieData } from '../../models/movie';

const Home = () => {
  const [movies, setMovies] = useState<IMovieData[]>([]);
  const [watched, setWatched] = useState<IWatchedMovieData[]>([]);

  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<null | string>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectedMovieId = (movieId: string) => {
    setSelectedMovieId((prevId) => (prevId === movieId ? null : movieId));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  };

  const handleAddWatchedMovie = (newMovie: IWatchedMovieData) => {
    setWatched((prevWatched) => [...prevWatched, newMovie]);
  };

  const handleDeleteWatchedMovie = (movieId: string) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== movieId),
    );
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${
            import.meta.env.VITE_API_KEY
          }`,
        );

        //! res.ok is always true , even if there was an error in the request
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies!');

        const data = await res.json();
        if (data?.Response === 'False') throw new Error(data?.Error);

        setMovies(data?.Search);
      } catch (err) {
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput
          query={query}
          handleInputQuery={handleInputQuery}
        />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && (
            <ErrorMessage
              icon='❗'
              message={error}
            />
          )}
          {!isLoading && !error && movies.length === 0 && (
            <ErrorMessage
              icon='🔍'
              message='Search for any movie'
            />
          )}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectedMovieId}
            />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default Home;
