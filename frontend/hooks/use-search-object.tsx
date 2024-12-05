'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useSearchObject() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Create an object from the URLSearchParams
  const searchObject = Object.fromEntries(searchParams.entries());

  // Update the URL with new search parameters
  const setSearchParams = useCallback(
    (searchObj: { [key: string]: string }) => {
      const params = new URLSearchParams(searchObj);

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router]
  );

  return { searchObject, setSearchParams };
}
