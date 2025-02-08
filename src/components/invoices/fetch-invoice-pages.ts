import { ITEMS_PER_PAGE } from '@/src/constants/pagenation';
import { prisma } from '@/src/lib/prisma';

export async function fetchInvoicesPages(query: string) {
	try {
		const result = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count
      FROM "invoices"
      JOIN "customers" ON "invoices"."customer_id" = "customers"."id"
      WHERE
        "customers"."name" ILIKE ${`%${query}%`}
        OR "customers"."email" ILIKE ${`%${query}%`}
        OR "invoices"."amount"::text ILIKE ${`%${query}%`}
        OR "invoices"."date"::text ILIKE ${`%${query}%`}
        OR "invoices"."status"::text ILIKE ${`%${query}%`}
    `;

		const totalCount = Number(result[0].count);
		const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of invoices.');
	}
}
