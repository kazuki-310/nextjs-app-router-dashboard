import { CreateInvoice } from '@/app/_components/invoices/buttons';
import Pagination from '@/app/_components/invoices/pagination';
import InvoicesTable from '@/app/_components/invoices/table';
import { Search } from '@/app/_components/search';
import { InvoicesTableSkeleton } from '@/app/_components/skeletons';
import { fetchInvoicesPages } from '@/app/_lib/data';
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';
import { Suspense } from 'react';

export const searchParamsCache = createSearchParamsCache({
	query: parseAsString.withDefault(''),
	page: parseAsInteger.withDefault(1),
});

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
	const searchParmsPromise = await searchParams;
	const { query, page } = searchParamsCache.parse(searchParmsPromise ?? {});

	const totalPages = await fetchInvoicesPages(query);

	return (
		<div className='w-full'>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-2xl'>Invoices</h1>
			</div>

			<div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
				<Search placeholder='Search invoices...' />
				<CreateInvoice />
			</div>

			{/* NOTE: Suspense に key を渡すことで異なる場合再レンダリングさせる。 */}
			<Suspense key={query + page} fallback={<InvoicesTableSkeleton />}>
				<InvoicesTable />
			</Suspense>

			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
