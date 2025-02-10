import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../page';

describe('Page', () => {
	beforeEach(() => {
		render(<Page />);
	});

	it('renders a heading', () => {
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
	});

	it('renders a link to the dashboard', () => {
		const link = screen.getByRole('link', { name: /Dashboard/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/dashboard');
	});
});
