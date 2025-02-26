import { prisma } from '@/src/lib/prisma';
import { formatCurrency } from '@/src/utils/formater';

export async function fetchCardData() {
	try {
		// 以下のように Promise.all を使って並列にクエリを走らせます
		const [numberOfInvoices, numberOfCustomers, paidAggregate, pendingAggregate] = await Promise.all([
			// 全インボイス数の取得
			prisma.invoice.count(),
			// 全顧客数の取得
			prisma.customer.count(),
			// status='paid' のインボイス合計金額
			prisma.invoice.aggregate({
				_sum: {
					amount: true,
				},
				where: {
					status: 'paid',
				},
			}),
			// status='pending' のインボイス合計金額
			prisma.invoice.aggregate({
				_sum: {
					amount: true,
				},
				where: {
					status: 'pending',
				},
			}),
		]);
		paidAggregate._sum.amount;

		// 合計金額をフォーマット
		const totalPaidInvoices = formatCurrency(paidAggregate._sum.amount ?? 0);
		const totalPendingInvoices = formatCurrency(pendingAggregate._sum.amount ?? 0);

		return {
			numberOfInvoices,
			numberOfCustomers,
			totalPaidInvoices,
			totalPendingInvoices,
		};
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch card data.');
	}
}
