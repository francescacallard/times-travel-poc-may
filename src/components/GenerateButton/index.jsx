import React from 'react'
import generate from '../../assets/generate.svg'    
import { useApp } from 'AppContext';
import './styles.css'

export const GenerateButton = () => {
  const {
    handleSubmitCountry,
  } = useApp();
  
  return (
    <div className='generateContainer'>
         <div className='generateButton' onClick={handleSubmitCountry}>
            <img src={generate} alt='Generate' />
            <h3 className='generateText'>Generate more options</h3>
        </div>
    </div>
  )
}

