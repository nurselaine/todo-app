import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import Navbar from '../Navbar/Navbar.jsx';
import Header from '../Header/Header.jsx';
import AddForm from '../AddForm/AddForm.jsx';
import List from '../List/List.jsx';
import { SettingsContext } from '../../Context/Settings/Settings.jsx';

import { v4 as uuid } from 'uuid';
import { Container, Pagination } from '@mantine/core';
import './styles.scss';

const ToDo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [paginationList, setPaginationList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  const { recordsPerPage, displayComplete, defaultSort } = useContext(SettingsContext);


  const handlePagination = (current) => {
    console.log('handle pagination', current);
    const indexOfLastRecord = current * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = list.slice(indexOfFirstRecord, indexOfLastRecord);
    setPaginationList(currentRecords);
  }

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
      <Navbar />
      <Header data-testid='todo-header' incomplete={incomplete} />
      <main>
        <AddForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          defaultValues={defaultValues}
          id="add-form"
        />
          <Container id='task-container' sx={{ maxWidth: '70vw' }} mx='0'>
            {paginationList.map(item => (
              <List
                item={item}
                toggleComplete={toggleComplete}
              />
            ))}
            <Pagination
              total={Math.ceil(list.length / 3)}
              // page={currentPage}
              recordsPerPage={3}
              onChange={handlePagination}
            />
          </Container>
      </main>
    </>
  );
};

export default ToDo;