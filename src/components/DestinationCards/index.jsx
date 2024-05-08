import React from 'react'
import './styles.css'
import greece from '../../assets/greece.png'

export const DestinationCards = () => {
  return (
   <div className='destinationCardContainer'>
    <h3 className='destinationCardContinent'>Europe</h3>
    <h2 className='destinationCardCountry'>Italy</h2>
    <div className='destinationImageContainer'>
        <img src={greece}></img>
    </div>
    <button className='destinationSelectButton'>Select</button>
    </div>
  )
}

