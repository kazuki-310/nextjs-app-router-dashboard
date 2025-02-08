import type { InvoiceStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import { customers, invoices, revenue, users } from '../constants/seed-data';
import { prisma } from '../lib/prisma';

async function main() {
	// 1. users テーブルのシード
	await prisma.user.createMany({
		data: await Promise.all(
			users.map(async (user) => ({
				id: user.id,
				name: user.name,
				email: user.email,
				password: await bcrypt.hash(user.password, 10),
			})),
		),

		skipDuplicates: true,
	});

	// 2. customer テーブルのシード
	await prisma.customer.createMany({
		data: customers.map((customer) => ({
			id: customer.id,
			name: customer.name,
			email: customer.email,
			imageUrl: customer.imageUrl,
		})),

		skipDuplicates: true,
	});

	// 3. invoice テーブルのシード
	await prisma.invoice.createMany({
		data: invoices.map((invoice) => ({
			customerId: invoice.customerId,
			amount: invoice.amount,
			status: invoice.status as InvoiceStatus,
			date: invoice.date,
		})),

		skipDuplicates: true,
	});

	// 4. revenue テーブルのシード
	await prisma.revenue.createMany({
		data: revenue.map((rev) => ({
			month: rev.month,
			revenue: rev.revenue,
		})),

		skipDuplicates: true,
	});
}

main()
	.catch((e) => {
		console.error('Seeding error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
