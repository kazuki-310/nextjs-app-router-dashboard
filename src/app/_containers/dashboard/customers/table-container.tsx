import Image from 'next/image';
import { fetchFilteredCustomers } from '../../../../components/customers/fetch-filtered-customers';
import { CustomersTablePresentation } from './table-presentation';

export async function CustomersTableContainer({ query }: { query: string }) {
	const customers = await fetchFilteredCustomers(query);

	return <CustomersTablePresentation customers={customers} />;
}
