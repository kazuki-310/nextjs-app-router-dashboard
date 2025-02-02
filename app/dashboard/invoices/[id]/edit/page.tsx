import { Breadcrumbs } from '@/app/_components/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/_components/invoices/edit-form';
import { fetchInvoiceById } from '@/app/_lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;

	const invoice = await fetchInvoiceById(id);

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

			<EditInvoiceForm invoice={invoice} />
		</main>
	);
}
