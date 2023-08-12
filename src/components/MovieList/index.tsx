import { MovieData } from "../../models/movie";

import Movie from "../Movie";

type MovieListProps = {
  movies: MovieData[];
};

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
