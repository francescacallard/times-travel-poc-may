import React, { useState } from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import { JournalistCard } from 'components/JournalistCard';
import { journalists } from './constants';
import { Loading } from 'components/Loading'; 
import { TimesChat } from 'components/TimesChat';
import timeTick from '../../assets/timeTick.svg';
import { useApp } from 'AppContext'
import { destinationCardImages } from '../DestinationCards/constants';
import { SaveGenerate } from 'components/SaveGenerate';

export const Destinations = ({
  isLoading,
  onCountrySelect,
  onContinentSelect,
  handleSubmitCountry
}) => {

  const {
    selectedMonth,
    aiResponse,
  } = useApp();

  const [selectedCountry, setSelectedCountry] = useState('');
  const handleCountrySelect = (country) => {
    onCountrySelect(country);
    setSelectedCountry(country);
  };

  const handleContinentSelect = (continent) => {
    onContinentSelect(continent);
  };

  const destinations = aiResponse
    .split('\n')
    .map((destination) => {
      const [_, countryContinent] = destination.split(':').map((item) => item.trim());
      const [country, continent] = countryContinent.split(',').map((item) => item.trim());
      return { country, continent };
    });
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='destinationContainer'>
        <div className='destinationHeadingContainer'>
          <h2 className='destinationHeading'>
            <TimesChat />
          </h2>
          <div className='messageContainer'>
          {`Great! Here are some amazing destinations for a relaxing trip in ${selectedMonth}. Choose any of the below destinations that are of interest to you or generate more options if these aren’t suitable. Remember you can save your progress for later!`}
        </div>
        </div>
        <div className='destinationSuggestionContainer'>
        {destinations.map((destination, index) => (
          <DestinationCards
            key={index}
            continent={destination.continent}
            country={destination.country}
            onSelect={handleCountrySelect}
            onContinentSelect={handleContinentSelect}
            image={destinationCardImages[index]?.src || ''}
          />
        ))}
      </div>
      </div>
      <div className='suggestionMessage'>

        <div className='suggestionHeading'>
          <TimesChat />
          <div className='iconContainerSuggestion'>
          <img
          src={timeTick}
          className='timesFavicon'
          alt='The Times Favicon'
          style={{ width: '16px', height: '16px' }}
        />
          Suggestions created through sources from The Times and Sunday Times Journalists
        </div>
        </div>
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
        <SaveGenerate handleSubmitCountry={handleSubmitCountry}/>
      </div>
    </>
  );
};