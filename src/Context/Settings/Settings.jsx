import React, { useState } from "react";

// create instance of createContext
export const SettingsContext = React.createContext();

const SettingsProvider = ({children}) => {
  const [recordsPerPage, setRecordsPerPage] = useState(3);
  const [displayComplete, setDisplayCompleted] = useState(false);
  const [sort, setSort] = useState('difficulty');
  const [settings, setSettings] = useState({recordsPerPage, displayComplete, sort});


  const values = {
    recordsPerPage,
    setRecordsPerPage,
    displayComplete,
    setDisplayCompleted,
    sort,
    setSort,
    settings,
    setSettings
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;