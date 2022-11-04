import React, { useState } from "react";

let storage = localStorage.getItem('userPreferences');
storage = JSON.parse(storage);
console.log('user preferences ', storage);

// create instance of createContext
export const SettingsContext = React.createContext();

const SettingsProvider = ({children}) => {
  const [recordsPerPage, setRecordsPerPage] = useState(storage ? storage.recordsPerPage : 3);
  const [displayComplete, setDisplayCompleted] = useState(storage ? storage.displayComplete : false);
  const [sort, setSort] = useState(storage ? storage.sort : 'difficulty');
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