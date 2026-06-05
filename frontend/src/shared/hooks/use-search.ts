import { useState } from 'react';
import { useDebounce } from './use-debounce';

export function useSearch() {
  const [search, setSearch] = useState('');
  const deboucedSearch = useDebounce(search, 500);

  return {
    value: deboucedSearch,
    set: setSearch,
  };
}
