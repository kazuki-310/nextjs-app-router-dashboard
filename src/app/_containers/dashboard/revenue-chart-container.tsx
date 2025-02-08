import { fetchRevenue } from '@/src/components/revenue/fetch-revenue-chart';
import { RevenueChartPresentation } from './revenue-chart-presentation';

export async function RevenueChartContainer() {
	const revenue = await fetchRevenue();

	return (
		<div className='w-full md:col-span-4'>
			<h2 className='mb-4 text-xl md:text-2xl'>Recent Revenue</h2>

			<RevenueChartPresentation revenue={revenue} />
		</div>
	);
}
