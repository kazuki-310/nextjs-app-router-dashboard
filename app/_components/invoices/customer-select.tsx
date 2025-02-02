import { fetchCustomers } from '@/app/_lib/data';

export async function CustomerSelect() {
	const customers = await fetchCustomers();

	return (
		<select
			id='customer'
			name='customerId'
			className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
			defaultValue=''
		>
			<option value='' disabled>
				Select a customer
			</option>

			{customers.map((customer) => (
				<option key={customer.id} value={customer.id}>
					{customer.name}
				</option>
			))}
		</select>
	);
}
