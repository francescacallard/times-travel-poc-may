import React, { useState } from 'react';
import './styles.css';
import image from '../../assets/rural.png';

export const HolidayTypes = ({
  country,
  holidayType,
  description,
  onSelect,
  selectedItems = [],
  selectedDuration,
  selectedMonth,
  selectedHolidayType,
  setSelectedHolidayType,
}) => {
  const handleSelect = () => {
    onSelect(holidayType, country, selectedDuration, selectedMonth, selectedItems);
    setSelectedHolidayType(holidayType);
  };

  const isSelected = selectedHolidayType === holidayType;

  return (
    <div className='textImageContainerCountry'>
      <img src={image} alt={holidayType} />
      <div className='holidayTypesTextContainer'>
        <h3 className='countryHeading'>{country}</h3>
        <h2 className='holidayTypesHeading'>{holidayType}</h2>
        <p className='holidayTypesDescription'>{description}</p>
        <button
          className={`holidayTypesButton ${isSelected ? 'selected' : ''}`}
          onClick={handleSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
};