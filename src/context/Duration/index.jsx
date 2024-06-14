import React, { useState, useContext, createContext } from "react";

const DurationContext = createContext();

export const DurationProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <DurationContext.Provider value={{ selectedMonth, setSelectedMonth, selectedDuration, setSelectedDuration, selectedItems, setSelectedItems }}>
      {children}
    </DurationContext.Provider>
  )
}

  export const useDuration = () => useContext(DurationContext);


