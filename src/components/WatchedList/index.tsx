import { WatchedMovieData } from "../../models/movie";

import WatchedMovie from "../WatchedMovie";

type WatchedMovieListProps = {
  watched: WatchedMovieData[];
};

const WatchedMovieList = ({ watched }: WatchedMovieListProps) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
