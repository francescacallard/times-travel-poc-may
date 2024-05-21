import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import { JournalistCard } from 'components/JournalistCard';
import timesFavicon from '../../assets/timesFavicon.svg';
import { journalists } from './constants';
import { GenerateButton } from 'components/GenerateButton';
import { Loading } from 'components/Loading'; 

export const Destinations = ({
  selectedMonth,
  onCountrySelect,
  onContinentSelect,
  destinations,
  isLoading
}) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const handleCountrySelect = (country) => {
    onCountrySelect(country);
    setSelectedCountry(country);
  };

  const handleContinentSelect = (continent) => {
    onContinentSelect(continent);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='destinationContainer'>
        <div className='destinationHeadingContainer'>
          <h2 className='destinationHeading'>
            {`Great! Here are some amazing destinations for a relaxing trip in ${selectedMonth}`}
          </h2>
          <h3 className='destinationSubHeading'>
            Select any of the below destinations that are of interest to you to refine your trip, you can save your progress for later!
          </h3>
        </div>
        <div className='destinationSuggestionContainer'>
          {destinations.map((destination, index) => (
            <DestinationCards
              key={index}
              continent={destination.continent}
              country={destination.country}
              onSelect={handleCountrySelect}
              onContinentSelect={handleContinentSelect}
            />
          ))}
        </div>
      </div>
      <div className='suggestionMessage'>
        <img
          src={timesFavicon}
          className='timesFavicon'
          alt='The Times Favicon'
          style={{ width: '16px', height: '16px' }}
        />
        <h3 className='suggestionHeading'>
          Suggestions created through sources from The Times and Sunday Times Journalists
        </h3>
      </div>
      <div className='journalistCardContainer'>
        {destinations.slice(0, 4).map((destination, index) => (
          <JournalistCard
            key={index}
            country={destination.country}
            name={journalists[index]?.name || ''}
            title={journalists[index]?.title || ''}
            image={journalists[index]?.image || ''}
          />
        ))}
      </div>
      <div className='generateSaveContainer'>
        <GenerateButton />
      </div>
    </>
  );
};