import { prisma } from '@/app/_lib/prisma';
import { formatCurrency } from '@/app/_utils/formater';

export async function fetchLatestInvoices() {
	try {
		const invoices = await prisma.invoices.findMany({
			orderBy: {
				date: 'desc',
			},
			include: {
				customers: {
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
			name: invoice.customers?.email,
			email: invoice.customers?.name,
			image_url: invoice.customers?.image_url,
			amount: formatCurrency(invoice.amount),
		}));

		return latestInvoices;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch the latest invoices.');
	} finally {
		await prisma.$disconnect();
	}
}
