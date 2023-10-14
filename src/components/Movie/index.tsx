import { IMovieData } from '../../models/movie';

type MovieProps = {
  movie: IMovieData;
  onSelectMovie: (movieId: string) => void;
};

const Movie = ({ movie, onSelectMovie }: MovieProps) => {
  return (
    <li onClick={() => onSelectMovie(movie?.imdbID)}>
      <img
        src={movie?.Poster}
        alt={`${movie?.Title} poster`}
      />
      <h3>{movie?.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie?.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
