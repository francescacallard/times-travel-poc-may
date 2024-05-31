import React from 'react'
import './styles.css'
import { GenerateButton } from 'components/GenerateButton';

export const HappyWithOptions = () => {
  return (
  <>
    <div className='happyWithOptionsContainer'>
      <h3 className='happyWithOptionsHeading'>Do you like either of these options?</h3>
      <p className='happyWithOptionsSubheading'> Select "Generate more options" to discover more</p>
    </div>
    <div className='secondGenerateButton'>
    <GenerateButton />
    </div>
    </>
  )
}

