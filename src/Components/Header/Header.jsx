import React, { useContext } from "react";
import { createStyles, Header, Navbar, Text } from "@mantine/core";
import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import { AuthContext } from "../../Context/Auth/Auth";

const useStyles = createStyles((theme, _params, getRef) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    fontSize: theme.fontSizes.lg,
    color: theme.colors.gray[3],
    marginBottom: '20px',
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
    marginBottom: '30px',
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
  },

  Login: {
    margin: 'auto',
    marginRight: '5px',
  },
  SignUp: {
    paddingLeft: '20px',
    color: theme.colors.gray[0],
    '&:hover': {
      cursor: 'pointer',
    }
  },
}))

export default function AppHeader(props) {
  const { classes } = useStyles();
  const { setShowSignUp } = useContext(AuthContext);

  const handleClick = () => {
    setShowSignUp(true);
    console.log('hello');
  }

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
          <li>
            <Text onClick={handleClick} className={classes.SignUp}>Sign Up</Text>
          </li>
        </ul>
        <section className={classes.Login}>
          <Login />
        </section>
      </Navbar>
      <h1 className={classes.h1} data-testid="todo-h1">To Do List: {props.incomplete} items pending</h1>
    </Header>
  )
};