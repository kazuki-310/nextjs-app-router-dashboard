export const users = [
	{
		id: '410544b2-4001-4271-9855-fec4b6a6442a',
		name: 'User',
		email: 'user@nextmail.com',
		password: '123456',
	},
];

export const customers = [
	{
		id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
		name: 'Evil Rabbit',
		email: 'evil@rabbit.com',
		imageUrl: '/customers/evil-rabbit.png',
	},
	{
		id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
		name: 'Delba de Oliveira',
		email: 'delba@oliveira.com',
		imageUrl: '/customers/delba-de-oliveira.png',
	},
	{
		id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
		name: 'Lee Robinson',
		email: 'lee@robinson.com',
		imageUrl: '/customers/lee-robinson.png',
	},
	{
		id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
		name: 'Michael Novotny',
		email: 'michael@novotny.com',
		imageUrl: '/customers/michael-novotny.png',
	},
	{
		id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
		name: 'Amy Burns',
		email: 'amy@burns.com',
		imageUrl: '/customers/amy-burns.png',
	},
	{
		id: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
		name: 'Balazs Orban',
		email: 'balazs@orban.com',
		imageUrl: '/customers/balazs-orban.png',
	},
];

export const invoices = [
	{
		id: '3958dc9e-784f-4377-85e9-fec4b6a6442a',
		customerId: customers[0].id,
		amount: 15795,
		status: 'pending',
		date: new Date('2022-12-06'),
	},
	{
		id: '3958dc9e-798f-4377-85e9-fec4b6a6442a',
		customerId: customers[1].id,
		amount: 20348,
		status: 'pending',
		date: new Date('2022-11-14'),
	},
	{
		id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
		customerId: customers[4].id,
		amount: 3040,
		status: 'paid',
		date: new Date('2022-10-29'),
	},
	{
		id: '76d65c26-784f-44a2-ac19-586678f7c2f2',
		customerId: customers[3].id,
		amount: 44800,
		status: 'paid',
		date: new Date('2023-09-10'),
	},
	{
		id: 'cc27c14a-784f-4f4a-a6c9-d45682c144b9',
		customerId: customers[5].id,
		amount: 34577,
		status: 'pending',
		date: new Date('2023-08-05'),
	},
	{
		id: '13d07535-784f-4157-a011-f8d2ef4e0cbb',
		customerId: customers[2].id,
		amount: 54246,
		status: 'pending',
		date: new Date('2023-07-16'),
	},
	{
		id: '410544b2-784f-4271-9855-fec4b6a6442a',
		customerId: customers[0].id,
		amount: 666,
		status: 'pending',
		date: new Date('2023-06-27'),
	},
];

export const revenue = [
	{ month: 'Jan', revenue: 2000 },
	{ month: 'Feb', revenue: 1800 },
	{ month: 'Mar', revenue: 2200 },
	{ month: 'Apr', revenue: 2500 },
	{ month: 'May', revenue: 2300 },
	{ month: 'Jun', revenue: 3200 },
	{ month: 'Jul', revenue: 3500 },
	{ month: 'Aug', revenue: 3700 },
	{ month: 'Sep', revenue: 2500 },
	{ month: 'Oct', revenue: 2800 },
	{ month: 'Nov', revenue: 3000 },
	{ month: 'Dec', revenue: 4800 },
];
