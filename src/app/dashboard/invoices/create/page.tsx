import { InvoiceFormContainer } from '@/src/app/_containers/dashboard/invoices';
import { Breadcrumbs } from '@/src/components/invoices/breadcrumbs';
import { createInvoice } from '@/src/lib/invoice-form-action';
import { Suspense } from 'react';

export default async function Page() {
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/dashboard/invoices' },
					{
						label: 'Create Invoice',
						href: '/dashboard/invoices/create',
						active: true,
					},
				]}
			/>

			<Suspense fallback={'loading...'}>
				<InvoiceFormContainer mode='create' onSubmitAction={createInvoice} cancelHref='/dashboard/invoices' />
			</Suspense>
		</main>
	);
}
