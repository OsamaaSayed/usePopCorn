import { IWatchedMovieData } from "../../models/movie";

import WatchedMovie from "../WatchedMovie";

type WatchedMovieListProps = {
  watched: IWatchedMovieData[];
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
