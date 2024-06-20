import React from 'react'
import generate from '../../assets/generate.svg'    
import './styles.css'

export const GenerateButton = ( {onClick}) => {
  return (
    <div className='generateContainer'>
         <div className='generateButton' onClick={onClick}>
            <img src={generate} alt='Generate' />
            <h3 className='generateText'>Generate more options</h3>
        </div>
    </div>
  )
}

