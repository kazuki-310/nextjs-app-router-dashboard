'use client';

import type React from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export function Search({ placeholder }: { placeholder: string }) {
	const [searchParams, setSearchParams] = useQueryStates(
		{
			query: parseAsString.withDefault(''),
			page: parseAsInteger.withDefault(1),
		},
		{ shallow: false, throttleMs: 1000 },
	);

	const { query } = searchParams;

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams({
			query: e.target.value,
			page: 1,
		});
	};

	return (
		<div className='relative flex flex-1 flex-shrink-0'>
			<label htmlFor='search' className='sr-only'>
				Search
			</label>
			<input
				className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
				placeholder={placeholder}
				value={query || ''}
				onChange={handleSearch}
			/>

			<MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
		</div>
	);
}
