import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import AppHeader from '../Header/Header.jsx';
import AddForm from '../AddForm/AddForm.jsx';
import List from '../List/List.jsx';
import Auth from '../Auth/Auth.jsx';
import { SettingsContext } from '../../Context/Settings/Settings.jsx';
import { AuthContext } from '../../Context/Auth/Auth.jsx';

import { When } from 'react-if';
import axios from 'axios';
import { Card, createStyles, Grid } from '@mantine/core';
import './styles.scss';
import Signup from '../Signup/Signup.jsx';

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    width: '80%',
    margin: 'auto',
    marginBottom: '30px',
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
  const { setError, showSignUp } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
        setList(response.data.results);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  async function addItem(item) {
    try {
      item.complete = false;
      setList([...list, item]);
      await axios.post(`https://api-js401.herokuapp.com/api/v1/todo`, item);
    } catch (e) {
      setError(e)
    }
  }

  async function deleteItem(id) {
    const items = list.filter(item => item._id !== id);
    setList(items);
    try {
      let response = await axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`);
      console.log(response);
    } catch (e) {
      console.error(e);
      setError(e);
    }

    const stringifiedList = JSON.stringify(items);
    localStorage.setItem('List', stringifiedList);
  }

  async function toggleComplete(id) {
    try {
      let itemToUpdate;
      const items = list.map(item => {
        if (item._id === id) {
          item.complete = !item.complete;
          itemToUpdate = item;
        }
        return item;
      });

      await axios.put(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, itemToUpdate);   
      setList(items);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  // console.log(list);
  return (
    <>
      <AppHeader data-testid='todo-header' incomplete={incomplete} />
      <When condition={showSignUp === true}>
        <Signup />
      </When>
      <main className={classes.main}>
        <Auth capability="read">
          <Grid style={{ width: '99%', margin: 'auto' }}>
            <Grid.Col xs={12} sm={4} >
              <Auth capability="create">
                <Card withBorder p='xs'>
                  <AddForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    defaultValues={defaultValues}
                    id="add-form"
                    data-testid='todo-form'
                  />
                </Card>
              </Auth>
            </Grid.Col>
            <Grid.Col xs={12} sm={8} sx={{ paddingRight: '0' }}>
              <List
                list={list}
                toggleComplete={toggleComplete}
                recordsPerPage={recordsPerPage}
                data-testid='todo-list'
                deleteItem={deleteItem}
              />
            </Grid.Col>
          </Grid>
        </Auth>
      </main>
    </>
  );
};

export default ToDo;