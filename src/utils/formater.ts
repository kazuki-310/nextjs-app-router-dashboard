export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};

export const formatDateToLocal = (date: Date, locale = 'en-US') => {
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};
	const formatter = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};
