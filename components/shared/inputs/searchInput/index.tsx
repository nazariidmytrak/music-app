'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import useDebounce from '@/hooks/useDebounce';
import Input from '@/components/shared/inputs/input';

const SearchInput = () => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder='What do you want to listen to?'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
