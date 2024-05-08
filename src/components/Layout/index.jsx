import React from 'react'
import './styles.css'
import { DropdownMonth } from 'components/DropdownMonth'
import { Budget } from 'components/Budget'

export const Layout = () => {
  return (
    <div className='container'>
        <DropdownMonth />
        <Budget />
    </div>
  )
}

