import React from 'react';
import './styles.css';
import { ItineraryRecommendations } from 'components/ItineraryRecommendations';
// import { HappyWithOptions } from 'components/HappyWithOptions';
import { FinalItinerary } from 'components/FinalItinerary';

export const ItineraryHeading = ({
  selectedHolidayType,
  country,
  selectedDuration,
  selectedMonth,
  selectedItems,
  selectedBudget,
  recommendationData,
}) => {
  return (
    <>
      <div className='itineraryHeadingContainer'>
        <div className='itineraryHeadingContainerText'>
          <h3 className='itineraryHeadingText'>{`A ${selectedHolidayType} is the perfect trip to cater to all your needs!`}</h3>
          <p className='itineraryHeadingDescription'>
            Take some time to browse the itineraries, if these aren't quite right you can speak to one of our expert travel advisors to tailor your trip. If you'd like more information, please select one of the below or save your progress. By booking a tour through one of our trusted partners, you gain the advantage of a fully curated experience with all essentials included, from transportation to accommodation and guided tours. Additionally, our package offers peace of mind and convenience, ensuring a seamless travel experience without the hassle of planning and coordinating individual components.
          </p>
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
          />
        ))}
      </div>
      </div>
      {/* <HappyWithOptions /> */}
      {/* <FinalItinerary /> */}
    </>
  );
};