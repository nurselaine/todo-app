import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from './Settings';
// if exported as default, it does not need {} but since Context is just exported it must be destructered

describe('Settings Context', () => {
  test('Provides initial state from context', () => {
    return (
      <SettingsProvider>
        <SettingsContext>
          {
            ({recordsPerPage, complete}) => {
              <>
                <h1>SettingsProvider Initial State</h1>
                <h3 data-testid='setting-record'>{recordsPerPage} records count from context</h3>
                <h3 data-testid='setting-complete'>{complete.length} complete records from context</h3>
              </>
            }
          }
        </SettingsContext>
      </SettingsProvider>
    );

    const record = screen.getByTestId('setting-record');
    const complete = screen.getByTestId('setting-complete');

    expect(record).toHaveTextContent('3 records count from context');
    expect(complete).toHaveTextContent('0 complete records from context')
  });
})