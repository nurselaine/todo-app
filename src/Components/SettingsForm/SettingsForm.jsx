import React, { useEffect } from "react";
import { SettingsContext } from "../../Context/Settings/Settings";
import {
  TextInput,
  Group,
  Button,
  Box,
  Switch,
  NumberInput,
} from '@mantine/core';
import { useContext } from "react";

export default function SettingsForm({handleShowSetting}) {
  const { recordsPerPage,
          setRecordsPerPage,
          displayComplete,
          setDisplayCompleted,
          sort,
          setSort,
          settings,
          setSettings } = useContext(SettingsContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(recordsPerPage, sort, displayComplete);
      setSettings({recordsPerPage, displayComplete, sort});
      handleShowSetting(true);
    }

    const handleSyntheticEvent = (e) => {
      setDisplayCompleted(e.target.checked);
    }

    useEffect(() => {
      let userPreferences = {...settings}; // make a copy of object
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    }, [settings]);
  
    useEffect(() => {
      // get user preferences from local storage on page load
      let initalObj = localStorage.getItem('userPreferences');
      setSettings(JSON.parse(initalObj));
      setDisplayCompleted(JSON.parse(initalObj).displayComplete);
      setRecordsPerPage(JSON.parse(initalObj).recordsPerPage);
      setSort(JSON.parse(initalObj).sort);
    }, [])

  return (
    <Box sx={{ maxWidth: '30vw' }}  withBorder mx='0' >
      <h2>Update Settings</h2>
      <form data-testid="settings-form" >
        <Switch 
          data-testid="switch" 
          label="Show Completed ToDos" 
          labelPosition="right" 
          defaultValue={displayComplete}
          value={displayComplete}
          onChange={handleSyntheticEvent} 
        />
        <NumberInput
          label="Items Per Page"
          defaultValue={recordsPerPage}
          placeholder={recordsPerPage}
          step={1}
          onChange={setRecordsPerPage}
          name="text"
          type="number"
          data-testid="number-input"
        />

        <TextInput
          label="Sort Keyword"
          placeholder={sort}
          onChange={(e) => setSort(e.target.value)}
          name="sort"
          type="text"
          data-testid="text-input"
        />
      </form>
      <Group position="left" mt="md">
          <Button data-testid="submit-button" onClick={handleSubmit}>Show New Settings</Button>
        </Group>
    </Box>
  )
}