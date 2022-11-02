import React from "react";
import { createStyles, Header, Navbar, Text } from "@mantine/core";
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.lg,
    color: theme.colors.gray[3],
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    // padding: '20px',
  },
  Text: {
    paddingLeft: '20px',
  },
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    // fontSize: theme.fontSizes.lg,
    fontWeight: 600,
    padding: '20px',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
  },
  li: {
    listStyle: 'none',
  },
  Link: {
    color: theme.colors.gray[0],
    textDecoration: 'none',
  }
}))

export default function AppHeader(props) {
  const { classes } = useStyles();

  return (
    <Header id="test-header" data-testid="todo-header">
      <Navbar className={classes.navbar}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <Link className={classes.Link} to={'/'}><Text>Home</Text></Link>
          </li>
          <li>
            <Link className={classes.Link} to={'settings'}><Text className={classes.Text}>Settings</Text></Link>
          </li>
        </ul>
      </Navbar>
      <h1 className={classes.h1} data-testid="todo-h1">To Do List: {props.incomplete} items pending</h1>
    </Header>
  )
};