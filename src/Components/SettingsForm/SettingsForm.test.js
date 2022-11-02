import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '../../Context/Settings/Settings';

import SettingsForm from './SettingsForm';

describe('Settings Form Component', () => {
  test('Renders a form to change settings', () => {
    let expectedList = [{text: 'fdagna', asignee: 'fnjeagnjs', complete: false, difficulty: 3}];
    let expectedRecordsPerPage = 0;
    let expectedDisplayComplete = false;
    let expectedSort = '';
    let expectedSettings = {};

    const mockSubmit = jest.fn();
    const updateEvent = jest.fn();

    render (

      <SettingsProvider>
        <SettingsContext>
          {
            ({ recordsPerPage,
              displayComplete,    
              sort,     
              settings
            }) => {
              expectedDisplayComplete = displayComplete;
              expectedRecordsPerPage = recordsPerPage;
              expectedSettings = settings;
              expectedSort = sort;
              return (
                <>
                  <SettingsForm handleShowSetting={mockSubmit} />
                  <h3 data-testid="recordsPerPage">Records Per Page {recordsPerPage}</h3>
                  <h3 data-testid="displayComplete">Display Complete {displayComplete.toString()}</h3>
                </>
              )
            }
          }
        </SettingsContext>
      </SettingsProvider>
    );

    let form = screen.getByTestId('settings-form');
    let numberInput = screen.getByTestId('number-input');
    let textInput = screen.getByTestId('text-input');
    let submitButton = screen.getByTestId('submit-button');

    console.log(textInput);

    expect(form).toBeTruthy();
    expect(form).toBeInTheDocument();
    expect(numberInput).toHaveValue(expectedRecordsPerPage);
    expect(textInput).toBeTruthy();
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submit-button'));
    // fireEvent.change(screen.getByTestId('switch'));

    expect(screen.getByTestId('recordsPerPage')).toHaveTextContent(`Records Per Page ${expectedRecordsPerPage}`);
    expect(screen.getByTestId('displayComplete')).toHaveTextContent(`Display Complete ${expectedDisplayComplete}`);
    expect(mockSubmit).toHaveBeenCalled();
    // expect(expectedDisplayComplete).toBeFalsy();
  });
});