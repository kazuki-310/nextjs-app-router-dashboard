import { Button } from '@/app/_components/button';
import type { InvoiceForm } from '@/app/_lib/definitions';
import { updateInvoice } from '@/app/_lib/invoice-form-action';
import Link from 'next/link';
import { CustomerName } from './customer-name';
import { InvoiceAmount } from './invoice-amount';
import { InvoiceStatus } from './invoice-status';

export default function EditInvoiceForm({
	invoice,
}: {
	invoice: InvoiceForm;
}) {
	const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

	return (
		<form action={updateInvoiceWithId}>
			<div className='rounded-md bg-gray-50 p-4 md:p-6'>
				<CustomerName customerId={invoice.customer_id} />

				<InvoiceAmount amount={invoice.amount} />

				<InvoiceStatus status={invoice.status} />
			</div>

			<div className='mt-6 flex justify-end gap-4'>
				<Link
					href='/dashboard/invoices'
					className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
				>
					Cancel
				</Link>
				<Button type='submit'>Edit Invoice</Button>
			</div>
		</form>
	);
}
