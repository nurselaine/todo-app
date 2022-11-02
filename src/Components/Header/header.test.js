import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '../../Context/Settings/Settings';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import AppHeader from './Header';

describe('Header Component', () => {
  test('Renders a header element as expected', () => {
    let incomplete = 1;

    render( <AppHeader incomplete={incomplete} />, {wrapper: BrowserRouter} );

    let header = screen.getByTestId('todo-header');
    

    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(screen.getByText(`To Do List: ${incomplete} items pending`)).toBeInTheDocument();
  });
});