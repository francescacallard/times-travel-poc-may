import React, { useState } from 'react'
import './styles.css'

export const CountrySelection = () => {

  const [activeButton, setActiveButton] = useState(null)

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
    // setSelectedBudget(transportOptions[buttonIndex]);
  };
  return (
    <div className='selectedCountryHeadingContainer'>
      <h2 className='selectedCountryHeading'>{`Great Choice!  has some of the most beautiful scenery in the world`}</h2>
      <h3 className='selectedCountrySubheading'>{`There is so much to see and do in , it offers many different travel experiences`}</h3>
      <h2 className='transportText'>To receive personalised holiday recommendations tailored just for you, kindly specify your preferred mode of transportation</h2>
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
    </div>
  )
}
