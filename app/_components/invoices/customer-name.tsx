import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CustomerSelect } from './customer-select';

export function CustomerName({ customerId }: { customerId?: string }) {
	return (
		<div className='mb-4'>
			<label htmlFor='customer' className='mb-2 block text-sm font-medium'>
				Choose customer
			</label>
			<div className='relative'>
				<CustomerSelect customerId={customerId} />

				<UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
			</div>
		</div>
	);
}
