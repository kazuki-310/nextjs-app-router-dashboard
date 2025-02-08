import { ITEMS_PER_PAGE } from '@/src/constants/pagenation';
import type { InvoiceStatusType } from '@/src/lib/definitions';
import { prisma } from '@/src/lib/prisma';

export async function fetchFilteredInvoices(query: string, currentPage: number) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const result = await prisma.$queryRaw<
			{
				id: string;
				amount: number;
				date: Date;
				status: InvoiceStatusType;
				name: string;
				email: string;
				imageUrl: string;
			}[]
		>`
      SELECT
        i.id,
        i.amount,
        i.date,
        i.status,
        c.name,
        c.email,
        c.imageUrl
      FROM "invoices" AS i
      JOIN "customers" AS c
        ON i.customer_id = c.id
      WHERE
				c.name ILIKE ${`%${query}%`}
				OR c.email ILIKE ${`%${query}%`}
				OR i.amount::text ILIKE ${`%${query}%`}
				OR i.date::text ILIKE ${`%${query}%`}
				OR i.status::text ILIKE ${`%${query}%`}
      ORDER BY i.date DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

		return result;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch invoices.');
	}
}
