import { prisma } from '@/src/lib/prisma';

export async function fetchCustomers() {
	try {
		const customers = await prisma.customers.findMany({
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				name: 'asc',
			},
		});

		return customers;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch all customers.');
	}
}
