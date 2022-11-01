import { useState } from 'react';
import { Slider, Text, Container } from '@mantine/core';

export default function Demo({ handleChange, defaultValues }) {
  const [value, setValue] = useState(4);
  const [endValue, setEndValue] = useState(0);

  console.log(value, endValue);

  return (
    <Container size={400}>
      <Slider 
        label={null}
        defaultValue={defaultValues.difficulty}
        value={setValue()}
        onChange={handleChange}
        type='range'
        set={20}
        name='difficulty'
     /> 
    </Container>
  );
};