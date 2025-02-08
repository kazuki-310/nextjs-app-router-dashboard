import { CreateInvoice } from '@/src/components/invoices/buttons';
import { fetchInvoicesPages } from '@/src/components/invoices/fetch-invoice-pages';
import Pagination from '@/src/components/invoices/pagination';
import { InvoicesTable } from '@/src/components/invoices/table';
import { Search } from '@/src/components/search';
import { InvoicesTableSkeleton } from '@/src/components/skeletons';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
				<CreateInvoice />
			</div>

			{/* NOTE: Suspense に key を渡すことで異なる場合再レンダリングさせる。 */}
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<InvoicesTable query={query} currentPage={currentPage} />
			</Suspense>

			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
