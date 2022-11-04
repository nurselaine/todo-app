import React, { useState } from "react";
import { createStyles, Checkbox, TextInput, Modal, PasswordInput, Button } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth/Auth";

const useStyles = createStyles(theme => ({
  input: {
    spacing: 'md',
    margin: '10px',
  }
}))


export default function Signup() {
  const { classes } = useStyles();

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setShowSignUp, 
          showSignUp, 
          signUp } = useContext(AuthContext);

  return (
    <>
      <Modal
        opened={showSignUp}
        onClose={() => setShowSignUp(false)}
        title="Sign Up"
        centered
      >
        <TextInput
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          radius="xs"
          className={classes.input}
        />

        <PasswordInput
          placeholder="Password"
          radius="xs"
          onChange={e => setPassword(e.target.value)}
          className={classes.input}
        />

        <TextInput
          onChange={e => setFullName(e.target.value)}
          placeholder="Fullname"
          radius="xs"
          className={classes.input}
        />

        <TextInput
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          radius="xs"
          className={classes.input}
        />
        <Checkbox className={classes.input} label="I agree to sell my privacy" />
        <Button onClick={() => {signUp(username, password, fullname, email); setShowSignUp(false)}}>Sign Up!</Button>
      </Modal>
    </>
  )
}