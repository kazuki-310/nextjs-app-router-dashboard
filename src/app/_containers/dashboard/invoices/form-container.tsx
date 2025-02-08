import { fetchCustomers } from '@/src/components/customers/fetch-customers';
import type { InvoiceForm } from '@/src/lib/definitions';
import type { State } from '@/src/lib/invoice-form-action';
import { InvoiceFormPresentaion } from './form-presentation';

export type FormContainerProps = {
	mode: 'create' | 'edit';
	invoice?: InvoiceForm;
	onSubmitAction: (state: State, formData: FormData) => Promise<State>;
	cancelHref: string;
};

export async function InvoiceFormContainer(props: FormContainerProps) {
	const customers = await fetchCustomers();

	return <InvoiceFormPresentaion {...props} customers={customers} />;
}
