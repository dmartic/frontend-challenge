import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
    render(<App />);
    const punchline = screen.getByText(/Change mobility for good/i);
    expect(punchline).toBeInTheDocument();
});

test('creates shortened URL', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Url to shorten/i);
    const submit = screen.getByText(/Shorten and copy URL/i);
    const copiedText = screen.findByText(/--- copied!/i);
    fireEvent.change(input, {
        target: {
            value: 'https://www.google.com',
        },
    });
    fireEvent.click(submit);
    expect(copiedText);
});
