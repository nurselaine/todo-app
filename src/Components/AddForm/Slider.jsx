import { useState } from 'react';
import { Slider, Text, Container } from '@mantine/core';
import { useContext } from 'react';

import { SettingsContext } from '../../Context/Settings/Settings';

export default function Demo({ handleChange, defaultValues }) {
  const [value, setValue] = useState(4);
  const [endValue, setEndValue] = useState(0);

  console.log(value, endValue);
  console.log("hello from slider")
  return (
    <Container size={400}>
      <Slider 
        value={value}
        label={null}
        defaultValue={defaultValues.difficulty}
        max={5}
        min={1}
        step={25}
        onChange={handleChange}
        set={20}
        name='difficulty'
     /> 
    </Container>
  );
};