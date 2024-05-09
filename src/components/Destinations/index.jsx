import React from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import { JournalistCard } from 'components/JournalistCard';
import greece from '../../assets/greece.png';
import france from '../../assets/france.png';
import italy from '../../assets/italy.png';
import timesFavicon from '../../assets/timesFavicon.svg';
import { destinations, journalists } from './constants'



export const Destinations = () => {
  return (
    <>
    <div className='destinationContainer'>
      <h2 className='destinationHeading'>Great! Here are some amazing destinations for a relaxing trip in May</h2>
      <h3 className='destinationSubHeading'>Select any of the below destinations that are of interest to you to refine your trip, you can save your progress for later!</h3>
      <div className='destinationSuggestionContainer'>
        {destinations.map((destination, index) => (
          <DestinationCards
            key={index}
            continent={destination.continent}
            country={destination.country}
            image={destination.image}
          />
        ))}
      </div>
    </div>
    <div className='suggestionMessage'>
    <img src={timesFavicon} className='timesFavicon' alt='The Times Favicon' style={{ width: '24px', height: '24px' }}/>
    <h3 className='suggestionHeading'>Suggestions created through sources from The Times and Sunday Times Journalists</h3>
    </div>
    <div className='journalistCardContainer'>
        {journalists.map((journalist, index) => (
          <JournalistCard
            key={index}
            name={journalist.name}
            title={journalist.title}
            image={journalist.image}
          />
        ))}
      </div>
   </>
  );
};