import type React from 'react';
import './global.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { inter } from './_components/fonts';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
