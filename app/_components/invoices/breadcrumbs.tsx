import { clsx } from 'clsx';
import Link from 'next/link';

const BREAD_CRUMBS = [
	{ label: 'Invoices', href: '/dashboard/invoices' },
	{
		label: 'Create Invoice',
		href: '/dashboard/invoices/create',
		active: true,
	},
];

export function Breadcrumbs() {
	return (
		<nav aria-label='Breadcrumb' className='mb-6 block'>
			<ol className='flex text-xl md:text-2xl'>
				{BREAD_CRUMBS.map((breadcrumb, index) => (
					<li
						key={breadcrumb.href}
						aria-current={breadcrumb.active}
						className={clsx(breadcrumb.active ? 'text-gray-900' : 'text-gray-500')}
					>
						<Link href={breadcrumb.href}>{breadcrumb.label}</Link>
						{index < BREAD_CRUMBS.length - 1 ? <span className='mx-3 inline-block'>/</span> : null}
					</li>
				))}
			</ol>
		</nav>
	);
}
