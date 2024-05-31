import React, { useState } from 'react';
import './styles.css';
import image from '../../assets/rural.png';
import axios from 'axios';
import { Chat } from 'components/Chat';

export const HolidayTypes = ({
  country,
  holidayType,
  description,
  onSelect,
  selectedItems = [],
  selectedDuration,
  selectedMonth,
}) => {

  return (

    <div className='textImageContainerCountry'>
      <img src={image} alt={holidayType} />
      <div className='holidayTypesTextContainer'>
        <h3 className='countryHeading'>{country}</h3>
        <h2 className='holidayTypesHeading'>{holidayType}</h2>
        <p className='holidayTypesDescription'>{description}</p>
        <button className='holidayTypesButton'
  onClick={() =>
    onSelect(
      holidayType,
      country,
      selectedDuration,
      selectedMonth,
      selectedItems,
    )
  }>
          Select
        </button>
      </div>
    </div>

    
  );
};