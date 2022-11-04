import React, { useContext, useState } from "react";
import { Card, CloseButton, Container, Pagination, createStyles, Badge } from "@mantine/core";
import { SettingsContext } from "../../Context/Settings/Settings";
import Auth from "../Auth/Auth";
import { When, If, Then, Else } from 'react-if';
import { AuthContext } from "../../Context/Auth/Auth";

const useStyles = createStyles((theme) => ({
  card: {
    marginBottom: '10px',
    boxShadow: theme.shadows.xl,
  },
  taskHeader: {
    padding: '5px',
  },
  taskBody: {
    margin: '10px',
  },
  complete: {
    display: 'inline-block',
    cursor: 'pointer',
    verticalAlign: 'text-bottom'
  },
  assignee:{
    display: 'inline',
    padding: '20px',
    margin: 'none',
  },
  closeButton: {
    float: 'right',
  },
  difficulty: {
    float: 'right',
    margin: 'none',
  },
  pagination: {
  }
}))

export default function List({ toggleComplete, list, deleteItem }) {
  const { classes } = useStyles(createStyles)

  const { recordsPerPage, displayComplete, sort } = useContext(SettingsContext);
  const { can } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  let sortedList = [...list];
  let listToRender;
  
  // pagination
  console.log(sort);
  if(sort.toLowerCase() === 'difficulty'){
    sortedList = sortedList.sort((a, b) => a.difficulty - b.difficulty);
  };

  listToRender = displayComplete ? sortedList : sortedList.filter(item => !item.complete);
  const listStart = recordsPerPage * (page - 1);
  const listEnd = listStart + recordsPerPage;
  const displayList = listToRender.slice(listStart, listEnd);
  const pageCount = Math.ceil(listToRender.length / recordsPerPage);

  return (
    <Container data-testid="todo-list" sx={{ width: '100%', paddingRight: '0', }} mx='0'>
      {displayList.map((item, index) => (
        <Card className={classes.card} key={`task-${index}`} withBorder>
          <Card.Section className={classes.taskHeader} withBorder>
            <If condition={can('update')}>
              <Then>
                <Badge 
                  color={item.complete ? 'green' : 'red'} 
                  variant='filled' 
                  className={classes.complete} 
                  data-testid="todo-complete" 
                  onClick={() => toggleComplete(item._id)}
                >
                  {
                    item.complete ? 'Complete' : 'Pending'
                  }
                </Badge>
              </Then>
              <Else>
              <Badge 
                color={item.complete ? 'green' : 'red'} 
                variant='filled' className={classes.complete} 
                data-testid="todo-complete"
              >
                  {
                    item.complete ? 'Complete' : 'Pending'
                  }
                </Badge>
              </Else>
            </If>
            <p className={classes.assignee} ><small data-testid="todo-asignee">{item.assignee}</small></p>
            <Auth capability="delete">
              <CloseButton className={classes.closeButton} onClick={() => deleteItem(item._id)} />
            </Auth>
          </Card.Section>
          <Card.Section className={classes.taskBody}>
            <p data-testid="todo-task" >{item.text}</p>
            <span className={classes.difficulty} ><small data-testid="todo-difficulty">Difficulty: {item.difficulty}</small></span>
          </Card.Section>
          <Auth capability="delete">
          </Auth>
        </Card>
      ))}
      <When condition={displayList.length > 0 || listToRender.length > 0} >
        <Pagination
          total={pageCount}
          recordsPerPage={recordsPerPage}
          onChange={setPage}
          initialPage={1}
          className={classes.pagination}
        />
      </When>
    </Container>
  )
}

// const List = () => {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     (async () => {
//       let results = await axios.get('url goes here');
//       setList(results.data);
//     })();
//   }, []);

//   return (
//     {list.map((task, index) => (
//       <p key={`list-${index}`}>{`asignee: ${task.assignee}`}</p>
//     ))}
//   )
// }