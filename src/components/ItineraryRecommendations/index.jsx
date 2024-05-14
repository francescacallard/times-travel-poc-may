import React from 'react'
import './styles.css'
import lake from '../../assets/lake.png'
import { ItineraryDays } from './ItineraryDays'

export const ItineraryRecommendations = () => {
  return (
    <div className='itineraryRecommendationContainer'>
      <img src={lake}></img>
      <h2 className='itineraryRecommendationCountry'>Italy</h2>
      <h2 className='itineraryRecommendationPlace'>Lake Como and Lake Maggiore</h2>
      <div className='itineraryRecommendationInformation'>
        <p className='itineraryRecommendationInformationText'>Nights</p>
        <p className='itineraryRecommendationInformationText'>Star..accomodation</p>
        <p className='itineraryRecommendationInformationText'>Price range pp</p>
      </div>
      <div className='amountSavedText'>Save up to X amount of Money</div>
      <div className='itineraryText'>
        <ItineraryDays />
      </div>
    </div>
  )
}
