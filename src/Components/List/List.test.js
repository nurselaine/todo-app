import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '../../Context/Settings/Settings';

import List from './List';

describe('List Component', () => {
  test('Renders a List of to dos as expected', () => {
    let expectedList = [{text: 'fdagna', asignee: 'fnjeagnjs', complete: false, difficulty: 3}];
    let toggleComplete = jest.fn();
    let expectedRecordsPerPage = 0;
    let expectedDisplayComplete = false;

    render (

      <SettingsProvider>
        <SettingsContext>
          {
            ({ recordsPerPage, displayComplete }) => {
              expectedDisplayComplete = displayComplete;
              expectedRecordsPerPage = recordsPerPage;
              return (
                <>
                  <List list={expectedList} toggleComplete={toggleComplete} />
                  <h3 data-testid="recordsPerPage">Records Per Page {recordsPerPage}</h3>
                  <h3 data-testid="displayComplete">Display Complete {displayComplete.toString()}</h3>
                </>
              )
            }
          }
        </SettingsContext>
      </SettingsProvider>
    );

    let card = screen.getByTestId('todo-list');
    let task = screen.getByTestId('todo-task');
    let asignee = screen.getByTestId('todo-asignee');
    let difficulty = screen.getByTestId('todo-difficulty');
    let complete = screen.getByTestId('todo-complete');

    expect(card).toBeTruthy();
    expect(card).toBeInTheDocument();
    expect(task).toHaveTextContent(expectedList[0].text);
    expect(asignee).toHaveTextContent('Assigned to: ', expectedList[0].asignee);
    expect(difficulty).toHaveTextContent('Difficulty: ', expectedList[0].difficulty);
    expect(complete).toHaveTextContent('Complete: ', expectedList[0].complete);

    expect(screen.getByTestId('recordsPerPage')).toHaveTextContent(`Records Per Page ${expectedRecordsPerPage}`);
    expect(screen.getByTestId('displayComplete')).toHaveTextContent(`Display Complete ${expectedDisplayComplete}`);
  });
});