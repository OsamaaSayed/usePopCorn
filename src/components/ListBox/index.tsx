import { useState } from "react";
import { MovieData } from "../../models/movie";

import MovieList from "../MovieList";
import Button from "../shared/Button";

type ListBoxProps = {
  movies: MovieData[];
};

const ListBox = ({ movies }: ListBoxProps) => {
  const [isOpen1, setIsOpen1] = useState(true);

  const handleOpen1 = () => {
    setIsOpen1((prevOpen) => !prevOpen);
  };

  return (
    <div className="box">
      <Button onClick={handleOpen1}>{isOpen1 ? "–" : "+"}</Button>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
};

export default ListBox;
