import { prisma } from '@/app/_lib/prisma';

export async function fetchRevenue() {
	try {
		console.log('Fetching revenue data...');
		await new Promise((resolve) => setTimeout(resolve, 3000));
		const data = await prisma.revenue.findMany();
		console.log('Data fetch completed after 3 seconds.');
		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch revenue data.');
	}
}
