import React from 'react'
import './styles.css'
import { DestinationCards } from 'components/DestinationCards'

export const Destinations = () => {
  return (
    <div className='destinationContainer'>
        <h2 className='destinationHeading'>Great! Here are some amazing destinations for a relaxing trip in May</h2>
        <h3 className='destinationSubHeading'>Select any of the below destinations that are of interest to you to refine your trip, you can save your progress for later!</h3>
        <div className='destinationSuggestionContainer'>
           <DestinationCards />
        </div>
    </div>
  )
}