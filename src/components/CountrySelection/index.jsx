import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { HolidayTypes } from 'components/HolidayTypes';
import { holidayTypes } from './constants';
import { JournalistCard } from 'components/JournalistCard';
import { journalists } from '../Destinations/constants'
import { ItineraryHeading } from 'components/ItineraryHeading';

export const CountrySelection = ({ country }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [showHolidayTypes, setShowHolidayTypes] = useState(false);
  const [holidayType, setSelectedHolidayType] = useState(null);
  const holidaySelectionRef = useRef(null);
  const intineraryHeadingRef = useRef(null); 


  const transportOptions = [
    'Rental car',
    'Coach',
    'Public transport',
    'Private driver',
    'Other',
    'Not sure',
  ];

  const handleHolidaySelection = (holidayType) => {
    setSelectedHolidayType(holidayType);
  };

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex === activeButton ? null : buttonIndex);
    setShowHolidayTypes(true);
  };

  useEffect(() => {
    if (showHolidayTypes) {
      holidaySelectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showHolidayTypes]);

  useEffect(() => {
    if (holidayType) {
      intineraryHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [holidayType])

  return (
    <>
    <div className='selectedCountryHeadingContainer'>
      <h2 className='selectedCountryHeading'>
        {`Great Choice! ${country} has some of the most beautiful scenery in the world`}
      </h2>
      <h3 className='selectedCountrySubheading'>
        {`There is so much to see and do in ${country}, it offers many different travel experiences`}
      </h3>
      <h2 className='transportText'>
        To receive personalised holiday recommendations tailored just for you, kindly specify your preferred mode of transportation
      </h2>
      <div className='selectedTransportContainer'>
        <button
          className={`transportButtons ${activeButton === 0 ? 'active' : ''}`}
          onClick={() => handleButtonClick(0)}
        >
          Rental car
        </button>
        <button
          className={`transportButtons ${activeButton === 1 ? 'active' : ''}`}
          onClick={() => handleButtonClick(1)}
        >
          Coach
        </button>
        <button
          className={`transportButtons ${activeButton === 2 ? 'active' : ''}`}
          onClick={() => handleButtonClick(2)}
        >
          Public transport
        </button>
        <button
          className={`transportButtons ${activeButton === 3 ? 'active' : ''}`}
          onClick={() => handleButtonClick(3)}
        >
          Private driver
        </button>
        <button
          className={`transportButtons ${activeButton === 4 ? 'active' : ''}`}
          onClick={() => handleButtonClick(4)}
        >
          Other
        </button>
        <button
          className={`transportButtons ${activeButton === 5 ? 'active' : ''}`}
          onClick={() => handleButtonClick(5)}
        >
          Not sure
        </button>
      </div>
      <div className='holidayTypesContainer'>
        {showHolidayTypes &&
          holidayTypes.map((holidayType) => (
            <HolidayTypes
              key={holidayType.id}
              country={holidayType.country}
              holidayType={holidayType.holidayType}
              description={holidayType.description}
              image={holidayType.image}
              onSelect={handleHolidaySelection}
            />
          ))}
      </div>
    
      {showHolidayTypes && (
        <div className='journalistCardContainer'  ref={holidaySelectionRef}>
          {journalists.map((journalist) => (
            <JournalistCard
              key={journalist.id}
              name={journalist.name}
              title={journalist.title}
              image={journalist.image}
            />
          ))}
        </div>
      )}
    </div>
    {holidayType && (
  <div className='itineraryHeadingContainer' ref={intineraryHeadingRef}>
    <ItineraryHeading selectedHolidayType={holidayType} />
  </div>
)}
    </>
  );
};