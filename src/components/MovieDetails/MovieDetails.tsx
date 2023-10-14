import { useState, useEffect } from 'react';

import StarRating from '../shared/StarRating';
import Loader from '../shared/Loader';

import { IMovieDetails, IWatchedMovieData } from '../../models/movie';

type MovieDetailsProps = {
  selectedMovieId: string;
  watched: IWatchedMovieData[];
  onCloseMovie: () => void;
  onAddMovie: (newMovie: IWatchedMovieData) => void;
};

const MovieDetails = ({
  selectedMovieId,
  watched,
  onCloseMovie,
  onAddMovie,
}: MovieDetailsProps) => {
  const [movie, setMovie] = useState({} as IMovieDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const watchedMovie = watched.find(
    (element) => element.imdbID === selectedMovieId,
  );

  const handleAdd = () => {
    const newMovie: IWatchedMovieData = {
      imdbID: selectedMovieId,
      Title: movie?.Title,
      Poster: movie?.Poster,
      Year: movie?.Year,
      imdbRating: Number(movie?.imdbRating),
      runtime: Number(movie?.Runtime.split(' ').at(0)),
      userRating: userRating,
    };

    onAddMovie(newMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedMovieId}&apikey=${
            import.meta.env.VITE_API_KEY
          }`,
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.log(
          '🚀 ~ file: MovieDetails.tsx:17 ~ getMovieDetails ~ err:',
          err,
        );
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedMovieId]);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className='btn-back'
              onClick={onCloseMovie}
            >
              &larr;
            </button>

            <img
              src={movie?.Poster}
              alt={`Poster of ${movie?.Title}`}
            />

            <div className='details-overview'>
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!watchedMovie ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={(rate) => setUserRating(rate)}
                  />

                  {userRating > 0 && (
                    <button
                      className='btn-add'
                      onClick={handleAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with {watchedMovie?.userRating}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring: {movie?.Actors}</p>
            <p>Directed by: {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
