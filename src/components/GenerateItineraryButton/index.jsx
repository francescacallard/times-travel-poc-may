import React from 'react'
import generate from '../../assets/generate.svg'    
import { useApp } from 'AppContext';
import './styles.css'

export const GenerateItineraryButton = () => {
  const {
    handleSubmitChat,
  } = useApp();

  const handleGenerateMore = () => {
    handleSubmitChat();
  }
  
  return (
    <div className='generateContainer'>
         <div className='generateButton' onClick={handleGenerateMore}>
            <img src={generate} alt='Generate' />
            <h3 className='generateText'>Generate more options</h3>
        </div>
    </div>
  )
}

