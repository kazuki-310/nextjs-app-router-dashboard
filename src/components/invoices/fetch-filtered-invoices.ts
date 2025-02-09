import { ITEMS_PER_PAGE } from '@/src/constants/pagenation';
import { prisma } from '@/src/lib/prisma';
import type { Prisma } from '@prisma/client';

export async function fetchFilteredInvoices(query: string, currentPage: number) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	const orConditions: Prisma.InvoiceWhereInput[] = [
		{ customer: { name: { contains: query, mode: 'insensitive' } } },
		{ customer: { email: { contains: query, mode: 'insensitive' } } },
	];

	try {
		const invoices = await prisma.invoice.findMany({
			where: {
				OR: orConditions,
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
			orderBy: { date: 'desc' },
			skip: offset,
			take: ITEMS_PER_PAGE,
		});

		return invoices.map((invoice) => ({
			id: invoice.id,
			amount: invoice.amount,
			date: invoice.date,
			status: invoice.status,
			name: invoice.customer.name,
			email: invoice.customer.email,
			imageUrl: invoice.customer.imageUrl,
		}));
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch invoices.');
	}
}
