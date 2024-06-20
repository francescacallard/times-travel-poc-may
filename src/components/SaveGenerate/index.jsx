import React from 'react'
import './styles.css'
import { Save } from 'components/Save'
import { GenerateButton } from 'components/GenerateButton'

export const SaveGenerate = () => {
  return (
    <div className='saveGenerateContainer'>
      <GenerateButton />
      <Save />
    </div>
  )
}

