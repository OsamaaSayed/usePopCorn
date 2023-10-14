import { useState, useEffect } from 'react';


import StarRating from '../shared/StarRating';
import Loader from '../shared/Loader';

import { IMovieDetails } from '../../models/movie';

type MovieDetailsProps = {
  selectedMovieId: string;
  onCloseMovie: () => void;
};

const MovieDetails = ({ onCloseMovie, selectedMovieId }: MovieDetailsProps) => {
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
              <p></p>
            </div>
          </header>

          <section>
            <div className='rating'>
              <StarRating
                maxRating={10}
                size={24}
              />
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
