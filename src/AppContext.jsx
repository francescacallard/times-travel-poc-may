import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [holidayTypes, setHolidayTypes] = useState([]);
  const [selectedHolidayType, setSelectedHolidayType] = useState(null);
  const [recommendationData, setRecommendationData] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHolidayTypesLoading, setIsHolidayTypesLoading] = useState(false);
  const [isItineraryLoading, setIsItineraryLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);


    return (
        <AppContext.Provider value={{ selectedMonth,
          setSelectedMonth,
          selectedDuration,
          setSelectedDuration,
          selectedItems,
          setSelectedItems,
          aiResponse,
          setAiResponse,
          showDestinations,
          setShowDestinations,
          selectedCountry,
          setSelectedCountry,
          selectedContinent,
          setSelectedContinent,
          destinations,
          setDestinations,
          holidayTypes,
          setHolidayTypes,
          selectedHolidayType,
          setSelectedHolidayType,
          recommendationData,
          setRecommendationData,
          selectedItinerary,
          setSelectedItinerary,
          isLoading,
          setIsLoading,
          isHolidayTypesLoading,
          setIsHolidayTypesLoading,
          isItineraryLoading,
          setIsItineraryLoading,
          showChat,
          setShowChat, }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);