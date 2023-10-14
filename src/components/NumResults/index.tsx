import { IMovieData } from '../../models/movie';

type NumResultsProps = {
  movies: IMovieData[];
};

const NumResults = ({ movies }: NumResultsProps) => {
  return (
    <p className='num-results'>
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};

export default NumResults;
