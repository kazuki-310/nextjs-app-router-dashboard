import { Breadcrumbs } from '@/app/_components/invoices/breadcrumbs';
import { CreateForm } from '@/app/_components/invoices/create-form';

export default async function Page() {
	return (
		<main>
			<Breadcrumbs />

			<CreateForm />
		</main>
	);
}
