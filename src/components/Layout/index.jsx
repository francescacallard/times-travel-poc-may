import React from 'react'
import './styles.css'
import { DropdownMonth } from 'components/DropdownMonth'
import { Options } from 'components/Options'

export const Layout = () => {
  return (
    <div className='container'>
        <DropdownMonth />
        <Options />
    </div>
  )
}

