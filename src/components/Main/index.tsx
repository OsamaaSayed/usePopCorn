import { MovieData } from "../../models/movie";

import ListBox from "../ListBox";
import WatchedBox from "../WatchedBox";

type MainProps = {
  movies: MovieData[];
};

const Main = ({ movies }: MainProps) => {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
};

export default Main;
