import React from 'react'
import './styles.css'
import { Save } from 'components/Save'
import { GenerateItineraryButton } from 'components/GenerateItineraryButton'

export const GenerateItinerary = () => {
  return (
    <div className='saveGenerateContainer'>
      <GenerateItineraryButton />
      <Save />
    </div>
  )
}

