import { Breadcrumbs } from '@/app/_components/invoices/breadcrumbs';
import { CreateForm } from '@/app/_components/invoices/create-form';

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

			<CreateForm />
		</main>
	);
}
