import React, { useState, useEffect } from 'react';
import { Loading } from 'components/Loading'; 
import './styles.css';

export const CountrySelection = ({ country, onHolidayTypesRequest, isLoading }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [showHolidayTypes, setShowHolidayTypes] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const transportOptions = [
    'Rental car',
    'Coach',
    'Public transport',
    'Private driver',
    'Other',
    'Not sure',
  ];

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex === activeButton ? null : buttonIndex);
    setShowHolidayTypes(true);
    onHolidayTypesRequest();
  };

  return (
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
        {transportOptions.map((option, index) => (
          <button
            key={index}
            className={`transportButtons ${activeButton === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          >
            {option}
          </button>
        ))}
      </div>
  
    </div>
  );
};