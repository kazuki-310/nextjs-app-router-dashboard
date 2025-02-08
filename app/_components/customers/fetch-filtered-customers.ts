import { prisma } from '@/app/_lib/prisma';
import { formatCurrency } from '@/app/_utils/formater';

export async function fetchFilteredCustomers(query: string) {
	try {
		const customersData = await prisma.customers.findMany({
			where: {
				OR: [{ name: { contains: query, mode: 'insensitive' } }, { email: { contains: query, mode: 'insensitive' } }],
			},
			include: {
				invoices: true,
			},
			orderBy: {
				name: 'asc',
			},
		});

		const customers = customersData.map((customer) => {
			const total_invoices = customer.invoices.length;
			const total_pending = customer.invoices.reduce((sum, invoice) => {
				return invoice.status === 'pending' ? sum + invoice.amount : sum;
			}, 0);
			const total_paid = customer.invoices.reduce((sum, invoice) => {
				return invoice.status === 'paid' ? sum + invoice.amount : sum;
			}, 0);

			return {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				image_url: customer.image_url,
				total_invoices,
				total_pending: formatCurrency(total_pending),
				total_paid: formatCurrency(total_paid),
			};
		});

		return customers;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch customer table.');
	}
}
