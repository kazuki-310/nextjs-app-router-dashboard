import { Button } from '@/app/_components/button';
import { createInvoice } from '@/app/_lib/action';
import Link from 'next/link';
import { CustomerName } from './customer-name';
import { InvoiceAmount } from './invoice-amount';
import { InvoiceStatus } from './invoice-status';

export function CreateForm() {
	return (
		<form action={createInvoice}>
			<div className='rounded-md bg-gray-50 p-4 md:p-6'>
				<CustomerName />

				<InvoiceAmount />

				<InvoiceStatus />
			</div>

			<div className='mt-6 flex justify-end gap-4'>
				<Link
					href='/dashboard/invoices'
					className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
				>
					Cancel
				</Link>

				<Button type='submit'>Create Invoice</Button>
			</div>
		</form>
	);
}
