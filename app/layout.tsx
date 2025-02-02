import type React from 'react';
import './global.css';
import type { Metadata } from 'next';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { inter } from './_components/fonts';

export const metadata: Metadata = {
	title: {
		template: '%s | Next.js App Router Dashboard',
		default: 'Next.js App Router Dashboard',
	},

	description: 'The official Next.js Course Dashboard, built with App Router.',
	metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

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
