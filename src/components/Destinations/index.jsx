import React from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import greece from '../../assets/greece.png';

const destinations = [
  { continent: 'Europe', country: 'Italy', image: greece },
  { continent: 'Asia', country: 'Japan', image: greece },
  { continent: 'North America', country: 'USA', image: greece },
  { continent: 'South America', country: 'Brazil', image: greece },
  { continent: 'Africa', country: 'South Africa', image: greece },
];

export const Destinations = () => {
  return (
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
  );
};