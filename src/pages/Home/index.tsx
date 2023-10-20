import { useState, useCallback } from 'react';

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

import { useMovies } from '../../hooks/useMovies';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

import { IWatchedMovieData } from '../../models/movie';

const Home = () => {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<null | string>(null);

  const handleCloseMovie = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState<IWatchedMovieData[]>(
    [],
    'watchedList',
  );

  const handleSelectedMovieId = (movieId: string) => {
    setSelectedMovieId((prevId) => (prevId === movieId ? null : movieId));
  };

  const handleAddWatchedMovie = (newMovie: IWatchedMovieData) => {
    setWatched((prevWatched) => [...prevWatched, newMovie]);
  };

  const handleDeleteWatchedMovie = (movieId: string) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== movieId),
    );
  };

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput
          query={query}
          setQuery={setQuery}
          onCloseMovie={handleCloseMovie}
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
