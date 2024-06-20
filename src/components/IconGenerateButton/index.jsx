import React from 'react'
import generate from '../../assets/generate.svg'    
import saveIcon from '../../assets/saveIcon.svg'
import copy from '../../assets/copy.svg'
import './styles.css'

export const IconGenerateButton = ( {onClick}) => {
  return (
    <div className='generateContainer'>
    <div className='iconContainer'>
        <img src={saveIcon} className='saveIcon' alt='Save Icon' />
        <img src={copy} className='copyIcon' alt='Copy Icon' />
        </div>
       <div className='generateButton' onClick={onClick}>
          <img src={generate} alt='Generate' />
          <h3 className='generateText'>Generate more options</h3>
      </div>
  </div>
  )
}
