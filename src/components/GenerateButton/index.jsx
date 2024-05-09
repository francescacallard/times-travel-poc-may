import React from 'react'
import generate from '../../assets/generate.svg'    
import save from '../../assets/save.svg'
import './styles.css'

export const GenerateButton = () => {
  return (
    <div className='generateContainer'>
        <div className='generateButton'>
            <img src={generate} alt='Generate' />
            <h3 className='generateText'>Generate more options</h3>
        </div>
        <div className='saveButton'>
            <img src={save} alt='Save' />
            <h3 className='saveText'>Save progress</h3>
        </div>
    </div>
  )
}

