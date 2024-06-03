import React, { useState } from 'react';
import './styles.css';

export const DestinationCards = ({ continent, country, onSelect, image }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSelect = () => {
    onSelect(country);
    setIsClicked(true);
  };

  return (
    <div className='destinationCardContainer'>
      <h3 className='destinationCardContinent'>{continent}</h3>
      <h2 className='destinationCardCountry'>{country}</h2>
      <div className='destinationImageContainer'>
        <img src={image} alt={country} />
      </div>
      <button
        className={`destinationSelectButton ${isClicked ? 'clicked' : ''}`}
        onClick={handleSelect}
      >
        Select
      </button>
    </div>
  );
};