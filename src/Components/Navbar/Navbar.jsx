import React from "react";
import { Container, NavLink } from '@mantine/core';

export default function Navbar(){
  return (
    <Container fluid sx={{ background: 'hsl(209deg 77% 48%)', padding:'15px 5px' }}>
      <NavLink id='nav-link' label="Home" sx={{ color: 'white' }}/>
    </Container>
  )
}