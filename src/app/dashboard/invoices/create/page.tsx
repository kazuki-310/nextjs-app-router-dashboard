import { fetchCustomers } from '@/src/components/customers/fetch-customers';
import { Breadcrumbs } from '@/src/components/invoices/breadcrumbs';
import { Form } from '@/src/components/invoices/form';
import { createInvoice } from '@/src/lib/invoice-form-action';

export default async function Page() {
	const customers = await fetchCustomers();

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

			<Form mode='create' customers={customers} onSubmitAction={createInvoice} cancelHref='/dashboard/invoices' />
		</main>
	);
}
