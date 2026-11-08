import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

it('renders without crashing', () => {
 render(<Counter />);
 expect(screen.getByText('0')).toBeInTheDocument();
});

it('plus button works', () => {
 render(<Counter />);
 fireEvent.click(screen.getByText('+'));
 expect(screen.getByText('1')).toBeInTheDocument();
});

it('minus button works', () => {
 render(<Counter />);
 fireEvent.click(screen.getByText('-'));
 expect(screen.getByText('-1')).toBeInTheDocument();
});
