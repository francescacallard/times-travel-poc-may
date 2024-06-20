import React from 'react'
import generate from '../../assets/generate.svg'    
import saveIcon from '../../assets/saveIcon.svg'
import copy from '../../assets/copy.svg'
import './styles.css'

export const Save = () => {
  return (
    <div className='generateContainer'>
      {/* <div className='iconContainer'>
          <img src={saveIcon} className='saveIcon' alt='Save Icon' />
          <img src={copy} className='copyIcon' alt='Copy Icon' />
          </div> */}
         <div className='generateButton'>
            <img src={saveIcon} alt='Generate' />
            <h3 className='generateText'>Save progress</h3>
        </div>
    </div>
  )
}