import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import AppHeader from '../Header/Header.jsx';
import AddForm from '../AddForm/AddForm.jsx';
import List from '../List/List.jsx';
import { SettingsContext } from '../../Context/Settings/Settings.jsx';

import { v4 as uuid } from 'uuid';
import { Card, createStyles, Grid } from '@mantine/core';
import './styles.scss';

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    width: '80%',
    margin: 'auto',
  }
}));

const ToDo = () => {
  const { classes } = useStyles();

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  const { recordsPerPage } = useContext(SettingsContext);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);
  
  return (
    <>
      <AppHeader data-testid='todo-header' incomplete={incomplete} />
      <main className={classes.main}>
        <Grid style={{width: '100%'}}>
          <Grid.Col xs={12} sm={4} >
            <Card withBorder p='xs'>
              <AddForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                defaultValues={defaultValues}
                id="add-form"
              />
            </Card>
          </Grid.Col>
          <Grid.Col xs={12} sm={8}>
            <List
              list={list}
              toggleComplete={toggleComplete}
              recordsPerPage={recordsPerPage}
            />
          </Grid.Col>
        </Grid>
      </main>
    </>
  );
};

export default ToDo;