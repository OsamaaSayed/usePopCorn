import WatchedMovie from '../WatchedMovie';

import { IWatchedMovieData } from '../../models/movie';

type WatchedMovieListProps = {
  watched: IWatchedMovieData[];
  onDeleteMovie: (movieId: string) => void;
};

const WatchedMovieList = ({
  watched,
  onDeleteMovie,
}: WatchedMovieListProps) => {
  return (
    <ul className='list'>
      {watched?.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
