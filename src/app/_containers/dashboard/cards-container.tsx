import { fetchCardData } from '@/src/components/dashboard/fetch-card-data';
import { CardPresentation } from './card-presentation';

export async function CardContainer() {
	const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

	return (
		<>
			<CardPresentation title='Collected' value={totalPaidInvoices} type='collected' />
			<CardPresentation title='Pending' value={totalPendingInvoices} type='pending' />
			<CardPresentation title='Total Invoices' value={numberOfInvoices} type='invoices' />
			<CardPresentation title='Total Customers' value={numberOfCustomers} type='customers' />
		</>
	);
}
