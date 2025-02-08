import { prisma } from '@/src/lib/prisma';
import { formatCurrency } from '@/src/utils/formater';

export async function fetchLatestInvoices() {
	try {
		const invoices = await prisma.invoice.findMany({
			orderBy: {
				date: 'desc',
			},
			include: {
				customer: {
					select: {
						name: true,
						email: true,
						imageUrl: true,
					},
				},
			},
			take: 5,
		});

		const latestInvoices = invoices.map((invoice) => ({
			id: invoice.id,
			name: invoice.customer?.email,
			email: invoice.customer?.name,
			imageUrl: invoice.customer?.imageUrl,
			amount: formatCurrency(invoice.amount),
		}));
		return latestInvoices;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch the latest invoices.');
	}
}
