import { MovieData } from "../../models/movie";

import Logo from "../Logo";
import SearchInput from "../shared/SearchInput";
import NumResults from "../NumResults";

type NavbarProps = {
  query: string;
  movies: MovieData[];
  handleInputQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Navbar = ({ query, movies, handleInputQuery }: NavbarProps) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchInput query={query} handleInputQuery={handleInputQuery} />
      <NumResults movies={movies} />
    </nav>
  );
};

export default Navbar;
