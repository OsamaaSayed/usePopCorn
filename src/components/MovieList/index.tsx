import Movie from '../Movie';

import { IMovieData } from '../../models/movie';

type MovieListProps = {
  movies: IMovieData[];
  onSelectMovie: (movieId: string) => void;
};

const MovieList = ({ movies, onSelectMovie }: MovieListProps) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
