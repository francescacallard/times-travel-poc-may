import React from 'react';
import './styles.css';
import rural from '../../assets/rural.png';

export const HolidayTypes = ({ showHolidayTypes, country }) => {
  return (
    <div className='textImageContainer'>
      {showHolidayTypes && (
        <>
          <img src={rural} alt='rural' />
          <div className='holidayTypesTextContainer'>
            <h3 className='countryHeading'>{country}Italy</h3>
            <h2 className='holidayTypesHeading'>Rural Retreat</h2>
            <p className='holidayTypesDescription'>Nestled amidst rolling hills and picturesque vineyards, explore timeless escapes far from the Hustle and Bustle.</p>
            <button className='holidayTypesButton'>Select</button>
          </div>
        </>
      )}
    </div>
  );
};