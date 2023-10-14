import WatchedMovie from '../WatchedMovie';

import { IWatchedMovieData } from '../../models/movie';

type WatchedMovieListProps = {
  watched: IWatchedMovieData[];
};

const WatchedMovieList = ({ watched }: WatchedMovieListProps) => {
  return (
    <ul className='list'>
      {watched?.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
