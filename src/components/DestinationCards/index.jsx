import React from 'react';
import './styles.css';
import image from '../../assets/italy.png';

export const DestinationCards = ({ continent, country, onSelect }) => {
  const handleSelect = () => {
    onSelect(country);
  };

  return (
    <div className='destinationCardContainer'>
      <h3 className='destinationCardContinent'>{continent}</h3>
      <h2 className='destinationCardCountry'>{country}</h2>
      <div className='destinationImageContainer'>
        <img src={image} alt={country} />
      </div>
      <button className='destinationSelectButton' onClick={handleSelect}>
        Select
      </button>
    </div>
  );
};