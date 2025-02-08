import { prisma } from '@/src/lib/prisma';
import { formatCurrency } from '@/src/utils/formater';

export async function fetchFilteredCustomers(query: string) {
	try {
		const customersData = await prisma.customer.findMany({
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
			const totalInvoices = customer.invoices.length;
			const totalPending = customer.invoices.reduce((sum, invoice) => {
				return invoice.status === 'pending' ? sum + invoice.amount : sum;
			}, 0);
			const totalPaid = customer.invoices.reduce((sum, invoice) => {
				return invoice.status === 'paid' ? sum + invoice.amount : sum;
			}, 0);

			return {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				imageUrl: customer.imageUrl,
				totalInvoices,
				totalPending: formatCurrency(totalPending),
				totalPaid: formatCurrency(totalPaid),
			};
		});

		return customers;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch customer table.');
	}
}
