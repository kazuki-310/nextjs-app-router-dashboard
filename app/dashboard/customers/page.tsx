export default function Page() {
	const create = async () => {
		'use server';
		console.log('Creating invoice...');
	};

	return (
		<form action={create}>
			<input type='text' />
			<button type='submit'>button</button>
		</form>
	);
}
