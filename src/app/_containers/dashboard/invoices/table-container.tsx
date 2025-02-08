import { fetchFilteredInvoices } from '@/src/components/invoices/fetch-filtered-invoices';
import { InvoicesTablePresentation } from './table-presentation';

export async function InvoicesTableContainer({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const invoices = await fetchFilteredInvoices(query, currentPage);

	return <InvoicesTablePresentation invoices={invoices} />;
}
