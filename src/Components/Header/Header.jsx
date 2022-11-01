import React from "react";
import '../ToDo/styles.scss';

export default function Header(props) {
  return (
    <header id="header" data-testid="todo-header">
      <h1 data-testid="todo-h1">To Do List: {props.incomplete} items pending</h1>
    </header>
  )
};