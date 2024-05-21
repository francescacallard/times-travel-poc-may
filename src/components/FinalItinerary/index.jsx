import React from 'react';
import './styles.css';
import { GoCheckCircleFill } from "react-icons/go";


export const FinalItinerary = ({ itinerary }) => {
  const { place, recommendationData } = itinerary;
  console.log('this is the itinerary: ', itinerary);  
  
  console.log('recommendationData: ', recommendationData);

  return (
    <div className='finalItineraryContainer'>
      <h2 className='finalItineraryHeading'>Trip to {place} Includes:</h2>
      <div className='finalItineraryItems'>
        {recommendationData && recommendationData.length > 0 ? (
          recommendationData.map((item, index) => (
            <div key={index}>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.flights}</p>
              </div>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.transfers}</p>
              </div>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.accommodation}</p>
              </div>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.inclusive}</p>
              </div>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.activities}</p>
              </div>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.fees}</p>
              </div>
              <div className='finalItineraryItemIcon'>
              <GoCheckCircleFill style={{ color: '#317aab' }}/>
              <p className='finalItineraryText'>{item.savings}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};