import { prisma } from '@/src/lib/prisma';

export async function fetchInvoiceById(id: string) {
	try {
		const invoice = await prisma.invoice.findUnique({
			where: { id },
			select: {
				id: true,
				customerId: true,
				amount: true,
				status: true,
			},
		});

		if (!invoice) {
			throw new Error('Invoice not found');
		}

		return {
			...invoice,
			amount: invoice.amount / 100,
		};
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch invoice.');
	}
}
