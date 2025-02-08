import type { Metadata } from 'next';
import { Suspense } from 'react';

import { InvoicesTableContainer } from '@/src/app/_containers/dashboard/invoices';
import { CreateInvoiceLink } from '@/src/components/invoices/buttons';
import { fetchInvoicesPages } from '@/src/components/invoices/fetch-invoice-pages';
import Pagination from '@/src/components/invoices/pagination';
import { Search } from '@/src/components/search';
import { InvoicesTableSkeleton } from '@/src/components/skeletons';

export const metadata: Metadata = {
	title: 'Invoices',
};

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	const totalPages = await fetchInvoicesPages(query);

	return (
		<div className='w-full'>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-2xl'>Invoices</h1>
			</div>

			<div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
				<Search placeholder='Search invoices...' />
				<CreateInvoiceLink />
			</div>

			{/* NOTE: Suspense に key を渡すことで異なる場合再レンダリングさせる。 */}
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<InvoicesTableContainer query={query} currentPage={currentPage} />
			</Suspense>

			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
