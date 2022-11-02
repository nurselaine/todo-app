import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ToDo from '.';
import SettingsProvider, { SettingsContext } from '../../Context/Settings/Settings';
import { BrowserRouter, RouterProvider } from 'react-router-dom';

describe('Todo Component', () => {

  test('Renders a header element as expected', () => {
    let expectedRecordsPerPage = 0;

    render( 
      <SettingsProvider>
        <SettingsContext>
          {
            ({ recordsPerPage }) => {
              expectedRecordsPerPage = recordsPerPage;
              <ToDo />, {wrapper: BrowserRouter} 
            }
          }
        </SettingsContext>
      </SettingsProvider>
      
    );

    let header = screen.getByTestId('todo-header');
    let form = screen.getByTestId('todo-form');
    let list = screen.getByTestId('todo-list');
    

    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(screen.getByText(`To Do List: ${incomplete} items pending`)).toBeInTheDocument();
  });

  // test('Renders multiple components to create Home page of To do app', () => {
  //   let expectedRecordsPerPage = 0;

  //   render (

  //     <SettingsProvider>
  //       <SettingsContext>
  //         {
  //           ({ recordsPerPage }) => {
  //             expectedRecordsPerPage = recordsPerPage;
  //             return (
  //               <>
  //                 <ToDo />, {wrapper: BrowserRouter}
  //                 <h3 data-testid="recordsPerPage">Records Per Page {recordsPerPage}</h3>
  //               </>
  //             )
  //           }
  //         }
  //       </SettingsContext>
  //     </SettingsProvider>
  //   );

  //   let header = screen.getByTestId('todo-header');
  //   let form = screen.getByTestId('todo-form');
  //   let list = screen.getByTestId('todo-list');

  //   expect(header).toBeTruthy();
  //   expect(header).toBeInTheDocument();
  //   expect(form).toBeTruthy();
  //   expect(form).toBeInTheDocument();
  //   expect(list).toBeTruthy();
  //   expect(list).toBeInTheDocument();

  //   expect(screen.getByTestId('recordsPerPage')).toHaveTextContent(`Records Per Page ${expectedRecordsPerPage}`);
  // });
});