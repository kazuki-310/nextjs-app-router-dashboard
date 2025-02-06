import type { InvoiceStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import { customers, invoices, revenue, users } from '../_lib/placeholder-data';
import { prisma } from '../_lib/prisma';

async function main() {
	// 1. users テーブルのシード
	await prisma.users.createMany({
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

	// 2. customers テーブルのシード
	await prisma.customers.createMany({
		data: customers.map((customer) => ({
			id: customer.id,
			name: customer.name,
			email: customer.email,
			image_url: customer.image_url,
		})),

		skipDuplicates: true,
	});

	// 3. invoices テーブルのシード
	await prisma.invoices.createMany({
		data: invoices.map((invoice) => ({
			customer_id: invoice.customer_id,
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
