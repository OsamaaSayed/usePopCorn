import React, { useEffect, useRef } from 'react';

type SearchInputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onCloseMovie: () => void;
};

const SearchInput = ({ query, setQuery, onCloseMovie }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const callback = (e: React.KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (e.code === 'Enter') {
        inputRef.current?.focus();
        setQuery('');
        onCloseMovie();
      }
    };

    document.addEventListener('keydown', callback as unknown as EventListener);

    return () => {
      document.removeEventListener(
        'keydown',
        callback as unknown as EventListener,
      );
    };
  }, [setQuery, onCloseMovie]);

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
