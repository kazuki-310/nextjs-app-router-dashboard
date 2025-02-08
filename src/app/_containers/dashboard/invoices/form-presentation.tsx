'use client';

import { Button } from '@/src/components/button';
import type { CustomerField, InvoiceStatusType } from '@/src/lib/definitions';
import type { State } from '@/src/lib/invoice-form-action';
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';
import type { FormContainerProps } from './form-container';

export type InvoiceFormPresentaion = FormContainerProps & {
	customers: CustomerField[];
};

export function InvoiceFormPresentaion({
	mode,
	invoice,
	onSubmitAction,
	cancelHref,
	customers,
}: InvoiceFormPresentaion) {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction, isPending] = useActionState(onSubmitAction, initialState);

	const defaultCustomerId = invoice?.customerId ?? '';
	const defaultAmount = invoice?.amount;
	const defaultStatus = invoice?.status ?? 'pending';

	return (
		<form action={formAction}>
			<div className='rounded-md bg-gray-50 p-4 md:p-6'>
				<div className='mb-4'>
					<label htmlFor='customer' className='mb-2 block text-sm font-medium'>
						Choose customer
					</label>
					<div className='relative'>
						<CustomerSelect customerId={defaultCustomerId} customers={customers} />

						<UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
					</div>
				</div>

				<div id='customer-error' aria-live='polite' aria-atomic='true'>
					{state.errors?.customerId?.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>
							{error}
						</p>
					))}
				</div>

				<InvoiceAmount amount={defaultAmount} />

				<div id='amount-error' aria-live='polite' aria-atomic='true'>
					{state.errors?.amount?.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>
							{error}
						</p>
					))}
				</div>

				<InvoiceStatus status={defaultStatus} />

				<div id='status-error' aria-live='polite' aria-atomic='true'>
					{state.errors?.status?.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>
							{error}
						</p>
					))}
				</div>
			</div>

			<div className='mt-6 flex justify-end gap-4'>
				<Link
					href={cancelHref}
					className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
				>
					Cancel
				</Link>

				<Button type='submit' aria-disabled={isPending}>
					{isPending ? 'Loading...' : mode === 'edit' ? 'Edit Invoice' : 'Create Invoice'}
				</Button>
			</div>
		</form>
	);
}

function CustomerSelect({ customerId, customers }: { customerId: string; customers: CustomerField[] }) {
	return (
		<select
			id='customer'
			name='customerId'
			className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
			defaultValue={customerId}
			aria-describedby='customer-error'
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

function InvoiceAmount({ amount }: { amount?: number }) {
	return (
		<div className='mb-4'>
			<label htmlFor='amount' className='mb-2 block text-sm font-medium'>
				Choose an amount
			</label>

			<div className='relative mt-2 rounded-md'>
				<div className='relative'>
					<input
						id='amount'
						name='amount'
						type='number'
						step='0.01'
						defaultValue={amount}
						placeholder='Enter USD amount'
						className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
						aria-describedby='amount-error'
					/>

					<CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
				</div>
			</div>
		</div>
	);
}

function InvoiceStatus({ status }: { status: InvoiceStatusType }) {
	return (
		<fieldset aria-describedby='status-error'>
			<legend className='mb-2 block text-sm font-medium'>Set the invoice status</legend>
			<div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
				<div className='flex gap-4'>
					<div className='flex items-center'>
						<input
							id='pending'
							name='status'
							type='radio'
							value='pending'
							defaultChecked={status === 'pending'}
							className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
						/>
						<label
							htmlFor='pending'
							className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
						>
							Pending <ClockIcon className='h-4 w-4' />
						</label>
					</div>

					<div className='flex items-center'>
						<input
							id='paid'
							name='status'
							type='radio'
							value='paid'
							defaultChecked={status === 'paid'}
							className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
						/>
						<label
							htmlFor='paid'
							className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
						>
							Paid <CheckIcon className='h-4 w-4' />
						</label>
					</div>
				</div>
			</div>
		</fieldset>
	);
}
