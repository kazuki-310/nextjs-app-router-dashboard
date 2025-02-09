import { ITEMS_PER_PAGE } from '@/src/constants/pagenation';
import { prisma } from '@/src/lib/prisma';

import type { Prisma } from '@prisma/client';

export async function fetchInvoicesPages(query: string) {
	const orConditions: Prisma.InvoiceWhereInput[] = [
		{ customer: { name: { contains: query, mode: 'insensitive' } } },
		{ customer: { email: { contains: query, mode: 'insensitive' } } },
	];

	try {
		const totalCount = await prisma.invoice.count({
			where: {
				OR: orConditions,
			},
			orderBy: { date: 'desc' },
		});

		const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of invoices.');
	}
}
