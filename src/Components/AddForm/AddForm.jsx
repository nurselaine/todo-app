import React from "react";
// import Slider from './Slider';
import {
  TextInput,
  Group,
  Button,
  Box,
  Slider,
  Text,
} from '@mantine/core';

export default function AddForm({ handleSubmit, handleChange, defaultValues }) {

  return (
    <Box sx={{ maxWidth: '30vw' }}  withBorder mx='0' >
      <h2>Add To Do Item</h2>
      <form >

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
        <Text>Difficulty</Text>
        <Slider
          defaultValue={defaultValues.difficulty}
          max={5}
          min={0}
          step={1}
          onChange={handleChange}
          name="Difficulty"
          type='range'
        />
        {/* <label>
         <span>Difficulty</span>
         <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
       </label> */}

        <Group position="right" mt="md">
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Group>
      </form>

    </Box>
  )
}