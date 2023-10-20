import React, { useRef } from 'react';
import { useKey } from '../../../hooks/useKey';

type SearchInputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onCloseMovie: () => void;
};

const SearchInput = ({ query, setQuery, onCloseMovie }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useKey('Enter', () => {
    if (document.activeElement === inputRef.current) return;
    inputRef.current?.focus();
    setQuery('');
    onCloseMovie();
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
};

export default SearchInput;
