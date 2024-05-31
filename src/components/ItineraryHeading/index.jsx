import React, { useState } from 'react';
import './styles.css';
import { ItineraryRecommendations } from 'components/ItineraryRecommendations';
import { HappyWithOptions } from 'components/HappyWithOptions';
import { FinalItinerary } from 'components/FinalItinerary';
import { SummaryOfReviews } from 'components/SummaryOfReviews';
import { GenerateButton } from 'components/GenerateButton';
import { CallBack } from 'components/CallBack';
import { TimesChat } from 'components/TimesChat';
import timeTick from '../../assets/timeTick.svg';


export const ItineraryHeading = ({
  selectedHolidayType,
  country,
  recommendationData,
  setIsItineraryLoading
}) => {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
console.log('selectedHolidayType', selectedHolidayType)
  const handleItinerarySelect = (itinerary, recommendationData) => {
    setSelectedItinerary(itinerary, recommendationData);
  };


  return (
      <div className='itineraryHeadingContainer'>
        <div className='itineraryHeadingContainerText'>
            <TimesChat />
          <p className='itineraryHeadingDescription'>
          Take some time to browse the itineraries below, you can get a further breakdown of the trip by selecting one of the below. If these aren’t quite right you can tailor your trip further via the chat field or speak to one of our expert travel advisors.</p>
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
        <div className='itineraryRecommendationsSide'>
          {recommendationData && recommendationData.map((recommendation, index) => (
            <ItineraryRecommendations
              key={index}
              selectedHolidayType={selectedHolidayType}
              country={country}
              place={recommendation.place}
              nights={recommendation.nights}
              accommodation={recommendation.accommodation}
              priceRange={recommendation.priceRange}
              itinerary={recommendation.itinerary}
              onSelect={handleItinerarySelect}
              setIsItineraryLoading={setIsItineraryLoading}
            />
          ))}
      
        </div>
          <HappyWithOptions style={{
          marginTop: '20px',
         
        }}/>
          {selectedItinerary && (
        <div className="finalChoiceAndSummary">
          <FinalItinerary itinerary={selectedItinerary} />
          <SummaryOfReviews />
          <GenerateButton />
          <CallBack itinerary={selectedItinerary}/>
        </div>
      )}    
      </div>
  );
};