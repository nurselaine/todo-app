import React, { useState } from "react";

// create instance of createContext
export const SettingsContext = React.createContext();

const SettingsProvider = ({children}) => {
  const [recordsPerPage] = useState(3);
  const [displayComplete] = useState(false);
  const [defaultSort] = useState('')

  const values = {
    recordsPerPage,
    displayComplete,
    defaultSort,
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;