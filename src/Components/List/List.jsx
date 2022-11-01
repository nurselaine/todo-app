import React from "react";
import { Card, Group, Text, Menu, ActionIcon, Button } from "@mantine/core";

export default function List({ item, toggleComplete }) {
  return (
    <div key={item.id}>
      <p>{item.text}</p>
      <p><small>Assigned to: {item.assignee}</small></p>
      <p><small>Difficulty: {item.difficulty}</small></p>
      <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
      <hr />
    </div>
    // <Card>
    //   <Card.Selection>
    //     <Group>
    //       <Text></Text>
    //       <Menu>
    //         <Menu.Target>
    //           <ActionIcon>
    //             <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //               <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //               <line x1="18" y1="6" x2="6" y2="18"></line>
    //               <line x1="6" y1="6" x2="18" y2="18"></line>
    //             </svg>
    //           </ActionIcon>
    //         </Menu.Target>
    //       </Menu>
    //     </Group>
    //   </Card.Selection>
    // </Card>
  )
}