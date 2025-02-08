import { InvoiceFormContainer } from '@/src/app/_containers/dashboard/invoices';
import { Breadcrumbs } from '@/src/components/invoices/breadcrumbs';
import { fetchInvoiceById } from '@/src/components/invoices/fetch-invoice-by-id';
import { updateInvoice } from '@/src/lib/invoice-form-action';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;

	const invoice = await fetchInvoiceById(id);
	const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

	if (!invoice) {
		notFound();
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/dashboard/invoices' },
					{
						label: 'Edit Invoice',
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/>

			<Suspense fallback={'loading...'}>
				<InvoiceFormContainer
					mode='edit'
					invoice={invoice}
					onSubmitAction={updateInvoiceWithId}
					cancelHref='/dashboard/invoices'
				/>
			</Suspense>
		</main>
	);
}
