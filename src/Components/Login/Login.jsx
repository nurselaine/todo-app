import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth/Auth";
import { createStyles, TextInput, PasswordInput, Button } from "@mantine/core";
import { If, Then, Else } from "react-if";

const useStyles = createStyles(theme => ({
  section: {
    display: 'flex',
    flexDirection: 'row',
  },
  password: {
    width: '15vw',
    margin: 'auto',
    padding: '5px',
  },
  button: {
    margin: 'auto',
    backgroundColor: theme.colors.gray[8],
    '&:hover': {
      backgroundColor: theme.colors.gray[7],
    }
  }
}))

const Login = () => {
  const { classes } = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    logout();
  }

  return (
    <section className={classes.section}>
      <If condition={isLoggedIn}>
        <Then>
          <Button color="red" onClick={handleLogout}>Log Out</Button>
        </Then>
        <Else>
          <TextInput
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className={classes.password}
          />

          <PasswordInput
            placeholder="Password"
            radius="xs"
            onChange={e => setPassword(e.target.value)}
            className={classes.password}
          />
          <Button className={classes.button} onClick={() => login(username, password)}>Login</Button>
        </Else>
      </If>
    </section>
  )
}

export default Login;