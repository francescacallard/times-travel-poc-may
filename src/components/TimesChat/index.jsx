import React from 'react'
import timesChat from '../../assets/timesChat.svg'
import './styles.css'

export const TimesChat = () => {
  return (
    <div className='timesChatContainer'>
      <img src={timesChat}></img>
      <p className='timesChatHeading'>Times Travel Trip Planner</p>
      </div>
  )
}

