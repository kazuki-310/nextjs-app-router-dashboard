import { Breadcrumbs } from '@/app/_components/invoices/breadcrumbs';
import { CreateForm } from '@/app/_components/invoices/create-form';
import { fetchCustomers } from '@/app/_lib/data';

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

			<CreateForm customers={customers} />
		</main>
	);
}
