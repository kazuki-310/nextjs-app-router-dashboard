import { prisma } from '@/src/lib/prisma';
import { formatCurrency } from '@/src/utils/formater';

export async function fetchLatestInvoices() {
	try {
		const invoices = await prisma.invoices.findMany({
			orderBy: {
				date: 'desc',
			},
			include: {
				customer: {
					select: {
						name: true,
						email: true,
						image_url: true,
					},
				},
			},
			take: 5,
		});

		const latestInvoices = invoices.map((invoice) => ({
			id: invoice.id,
			name: invoice.customer?.email,
			email: invoice.customer?.name,
			image_url: invoice.customer?.image_url,
			amount: formatCurrency(invoice.amount),
		}));
		return latestInvoices;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch the latest invoices.');
	}
}
