import React from 'react'
import './styles.css'

export const FinalItinerary = ({ itinerary }) => {
  const handleClick = () => {
    console.log('itinerary from the final itineray section: ', itinerary)
  }

  return (
    <div className='finalItineraryContainer'>
      <h2 className='finalItineraryHeading'>Trip Includes:</h2>
      <div className='finalItineraryItems'>
        <p>Flights</p>
        <p>Transfers</p>
        <p>Accommodation and Duration</p>
        <p>Accommodation meals</p>
        <p>Tours</p>
        <p>Fees and free tickets</p>
        <p>Money saved booking through Times travel</p>
      </div>
      <button className='finalItineraryButton' onClick={handleClick}>Book Now</button>
    </div>
  )
}

