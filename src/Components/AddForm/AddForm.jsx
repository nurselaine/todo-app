import React from "react";
import { useForm } from '@mantine/form';
import { Slider } from "@mantine/core";
import {
  TextInput,
  Group,
  Button,
  Box,
  // Slider,
} from '@mantine/core';

export default function AddForm({ handleSubmit, handleChange, defaultValues }) {

  return (
    <Box sx={{ maxWidth: '30vw' }} mx='0' >
      <h2>Add To Do Item</h2>
      <form>

        <TextInput
          label="To Do Item"
          placeholder="Item Details"
          onChange={handleChange}
          name="text"
          type="text"
        />

        <TextInput
          label="Assigned To"
          placeholder="Assignee Name"
          onChange={handleChange}
          name="assignee"
          type="text"
        />
        {/* <Slider
          handleChange={handleChange}
          defaultValues={defaultValues}
        /> */}
      <label>
         <span>Difficulty</span>
         <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
       </label>

        <Group position="right" mt="md">
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Group>
      </form>

    </Box>
    // <form onSubmit={handleSubmit}>

    //   <h2>Add To Do Item</h2>

    //   <label>
    //     <span>To Do Item</span>
    //     <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
    //   </label>

    //   <label>
    //     <span>Assigned To</span>
    //     <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
    //   </label>

    //   <label>
    //     <span>Difficulty</span>
    //     <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
    //   </label>

    //   <label>
    //     <button type="submit">Add Item</button>
    //   </label>
    // </form>
  )
}