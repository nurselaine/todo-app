import React, { useContext, useState } from "react";

import AppHeader from "../Components/Header/Header";
import SettingsForm from '../Components/SettingsForm/SettingsForm';
import { SettingsContext } from "../Context/Settings/Settings";

import { createStyles, Grid, Card } from "@mantine/core";

const useStyles = createStyles((theme => ({
  grid: {
    width: '80%',
    margin: 'auto',
  }
})))

export default function SettingsPage(){
  const { classes } = useStyles();
  const { sort, displayComplete, recordsPerPage } = useContext(SettingsContext);
  const [showSettings, setShowSetting] = useState(false);

  const handleShowSetting = (boolean) => {
    setShowSetting(boolean);
  }

  return (
    <>
      <AppHeader />
      <Grid className={classes.grid}>
        <Grid.Col xs={12} sm={6}>
          <Card withBorder p='xs'>
            <SettingsForm handleShowSetting={handleShowSetting} />
          </Card>
        </Grid.Col>

        { showSettings && <Grid.Col xs={12} sm={6}>
          <Card withBorder>
            <p>Updated Settings</p>
            <p><small>{displayComplete ? `Show` : `Hide`} Completed ToDos</small></p>
            <p><small>Items Per Page: {recordsPerPage}</small></p>
            <p><small>Sort Keyword: {sort}</small></p>
          </Card>
        </Grid.Col>}
      </Grid>
    </>
  )
}