import { Suspense } from 'react';

import { CardContainer, LatestInvoicesContainer, RevenueChartContainer } from '@/src/app/_containers/dashboard';
import { CardsSkeleton, InvoiceSkeleton, RevenueChartSkeleton } from '@/src/components/skeletons';

export default async function Page() {
	return (
		<main>
			<h1 className='mb-4 text-xl md:text-2xl'>Dashboard</h1>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				<Suspense fallback={<CardsSkeleton />}>
					<CardContainer />
				</Suspense>
			</div>

			<div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
				<Suspense fallback={<RevenueChartSkeleton />}>
					<RevenueChartContainer />
				</Suspense>

				<Suspense fallback={<InvoiceSkeleton />}>
					<LatestInvoicesContainer />
				</Suspense>
			</div>
		</main>
	);
}
