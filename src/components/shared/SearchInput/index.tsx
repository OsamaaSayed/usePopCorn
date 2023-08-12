type SearchInputProps = {
  query: string;
  handleInputQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ query, handleInputQuery }: SearchInputProps) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleInputQuery}
    />
  );
};

export default SearchInput;
