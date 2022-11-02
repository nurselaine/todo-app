import React, { useContext, useState } from "react";
import { Card, Container, Pagination } from "@mantine/core";
import { SettingsContext } from "../../Context/Settings/Settings";
import { When } from 'react-if';

export default function List({ toggleComplete, list }) {
  const { recordsPerPage, displayComplete } = useContext(SettingsContext);

  const [page, setPage] = useState(1);

  // pagination
  const listToRender = displayComplete ? list : list.filter(item => !item.complete);
  const listStart = recordsPerPage * (page -1);
  const listEnd = listStart + recordsPerPage;
  const pageCount = Math.ceil(listToRender.length / recordsPerPage);
  const displayList = listToRender.slice(listStart, listEnd);

  // const [paginationList, setPaginationList] = useState([]);

  // let currentRecords;

  // const handlePagination = (current) => {
  //   console.log('handle pagination', current);
  //   const indexOfLastRecord = current * recordsPerPage;
  //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  //   if(displayComplete){
  //     currentRecords = list.slice(indexOfFirstRecord, indexOfLastRecord);
  //   } else {
  //     currentRecords = list.filter(item => item.complete);
  //     currentRecords = list.slice(indexOfFirstRecord, indexOfLastRecord);
  //   }
  //   setPaginationList(currentRecords);
  // }

  // const listToRender = displayComplete ? paginationList : list.filter( item => !item.complete);

  console.log(displayList);
  return (
    <Container data-testid="todo-list" sx={{ width: '100%' }} mx='0'>
      {displayList.map(item => (
        <Card key={item.id} withBorder>
          <p data-testid="todo-task" >{item.text}</p>
          <p><small data-testid="todo-asignee">Assigned to: {item.assignee}</small></p>
          <p><small data-testid="todo-difficulty">Difficulty: {item.difficulty}</small></p>
          <div data-testid="todo-complete" onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        </Card>
      ))}
      <When condition={displayList.length > 0} >
        <Pagination
          total={pageCount}
          recordsPerPage={recordsPerPage}
          onChange={setPage}
          initialPage={1}
        />
      </When>
    </Container>
  )
}