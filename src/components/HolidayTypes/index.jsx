import React from 'react';
import './styles.css';
import holidayTypes from '../CountrySelection/constants'

export const HolidayTypes = ({ country, holidayType, description, image, onSelect }) => {
  const handleSelect = () => {
    onSelect(holidayType);
    console.log("This is the holidayType", holidayType)
  };

  return (
    <div className='textImageContainer'>
      <img src={image} alt={holidayType} />
      <div className='holidayTypesTextContainer'>
        <h3 className='countryHeading'>{country}</h3>
        <h2 className='holidayTypesHeading'>{holidayType}</h2>
        <p className='holidayTypesDescription'>{description}</p>
        <button className='holidayTypesButton' onClick={handleSelect}>
          Select
        </button>
      </div>
    </div>
  );
};