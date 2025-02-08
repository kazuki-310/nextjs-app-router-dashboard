import { fetchLatestInvoices } from '@/src/components/invoices/fetch-latest-invoices';
import { LatestInvoicesPresentation } from './latest-invoices-presentation';

export async function LatestInvoicesContainer() {
	const latestInvoices = await fetchLatestInvoices();

	return (
		<div className='flex w-full flex-col md:col-span-4'>
			<h2 className='mb-4 text-xl md:text-2xl'>Latest Invoices</h2>

			<LatestInvoicesPresentation latestInvoices={latestInvoices} />
		</div>
	);
}
