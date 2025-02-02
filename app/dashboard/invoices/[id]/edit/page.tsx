import { Breadcrumbs } from '@/app/_components/invoices/breadcrumbs';
import { Form } from '@/app/_components/invoices/form';
import { fetchCustomers, fetchInvoiceById } from '@/app/_lib/data';
import { updateInvoice } from '@/app/_lib/invoice-form-action';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;

	const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
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

			<Form
				mode='edit'
				invoice={invoice}
				customers={customers}
				onSubmitAction={updateInvoiceWithId}
				cancelHref='/dashboard/invoices'
			/>
		</main>
	);
}
