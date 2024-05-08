import React from 'react'
import timesTravel from 'assets/timesTravel.png'
import { DropdownMonth } from 'components/DropdownMonth'

export const BackgroundImage = () => {
  return (
    <div classname='backgroundImage'>
        <img src={timesTravel} alt='times-travel' />
        <DropdownMonth />
    </div>
  )
}
