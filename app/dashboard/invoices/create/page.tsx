import { fetchCustomers } from '@/app/_components/customers/fetch-customers';
import { Breadcrumbs } from '@/app/_components/invoices/breadcrumbs';
import { Form } from '@/app/_components/invoices/form';
import { createInvoice } from '@/app/_lib/invoice-form-action';

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
