import React from 'react';
import './styles.css';
import greeceOne from '../../assets/greeceOne.jpeg';
import greeceTwo from '../../assets/greeceTwo.jpeg';
import greeceThree from '../../assets/greeceThree.jpeg';
import greeceFour from '../../assets/greeceFour.jpeg';
import greeceFive from '../../assets/greeceFive.jpeg';

const images = [greeceOne, greeceTwo, greeceThree, greeceFour, greeceFive];

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
  index
}) => {
  const handleSelect = () => {
    onSelect(holidayType, country, selectedDuration, selectedMonth, selectedItems);
    setSelectedHolidayType(holidayType);
  };

  const isSelected = selectedHolidayType === holidayType;

  return (
    <div className='textImageContainerCountry'>
      <img className="greeceImages" src={images[index]} alt={holidayType} />
      <div className='holidayTypesTextContainer'>
        <h3 className='countryHeading'>{country.toUpperCase()}</h3>
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