import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from './Settings';
// if exported as default, it does not need {} but since Context is just exported it must be destructered

describe('Settings Context', () => {
  test('Provides initial state from context', () => {

    let expectedRecordsPerPage = 0;
    let expectedDisplayComplete = false;
    let expectedSort = '';
    let expectedSettings = {};

    render (

      <SettingsProvider>
        <SettingsContext>
          {
            ({ recordsPerPage, displayComplete, settings, sort }) => {
              expectedDisplayComplete = displayComplete;
              expectedRecordsPerPage = recordsPerPage;
              expectedSort = sort;
              expectedSettings = settings;
              return (

                <>
                  <h1>SettingsProvider Initial State</h1>
                  <h3 data-testid='setting-record'>{recordsPerPage} records count from context</h3>
                  <h3 data-testid='setting-complete'>complete records from context: {displayComplete.toString()}</h3>
                  <h3 data-testid='setting-sort'>Expected Sort default value: {sort}</h3>
                  <h3 data-testid='setting-settings'>User Settings preferences: {`${settings.recordsPerPage}, ${settings.displayComplete}, ${settings.sort}`}</h3>
                </>
              )
            }
          }
        </SettingsContext>
      </SettingsProvider>
    );

    const record = screen.getByTestId('setting-record');
    const complete = screen.getByTestId('setting-complete');
    const sort = screen.getByTestId('setting-sort');
    const settings = screen.getByTestId('setting-settings');

    expect(record).toHaveTextContent(expectedRecordsPerPage, ' records count from context');
    expect(complete).toHaveTextContent(expectedDisplayComplete, 'complete records from context: false');
    expect(sort).toHaveTextContent('Expected Sort default value: difficulty');
    expect(settings).toHaveTextContent('User Settings preferences: 3, false, difficulty');
  });
})