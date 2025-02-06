export function formatCurrency(value: number | string) {
	// value が string の場合は parseInt を使い、そうでなければそのまま number 型として扱います。
	const numberValue = typeof value === 'string' ? Number.parseInt(value, 10) : value;

	// Intl.NumberFormat を使って通貨形式にフォーマットします
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(numberValue);
}
