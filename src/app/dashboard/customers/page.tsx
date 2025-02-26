import { Suspense } from 'react';

import { CustomersTableContainer } from '@/src/app/_containers/dashboard/customers';
import { Search } from '@/src/components/search';
import { InvoicesTableSkeleton } from '@/src/components/skeletons';

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	return (
		<div className='w-full'>
			<h1 className='mb-8 text-xl md:text-2xl'>Customers</h1>
			<Search placeholder='Search customers...' />

			{/* NOTE: Suspense に key を渡すことで異なる場合再レンダリングさせる。 */}
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<CustomersTableContainer query={query} />
			</Suspense>
		</div>
	);
}
