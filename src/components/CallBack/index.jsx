import React, { useState } from 'react'
import './styles.css'
import callBlack from '../../assets/callBlack.svg'
import callBackBlack from '../../assets/callBackBlack.svg'
import sendBlack from '../../assets/sendBlack.svg'

export const CallBack = ({itinerary}) => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleClick = (buttonName) => {
    setClickedButton(prevButton => prevButton === buttonName ? null : buttonName);
    console.log(`${buttonName} Requested:`, itinerary);
  }

  return (
    <div className='callBackContainer'>
      <h2 className='callBackHeading'>It's much easier to tailor your trip to your needs over the phone, from flights, to hotels to experiences, we can ensure you have the perfect trip</h2>
      <p className='callBackSubheading'>You can call us on the number below or request a call back!</p>
      <div className='callBackButtonContainer'>
        <button  
          className={`callBackButton ${clickedButton === 'callBack' ? 'clicked' : ''}`} 
          onClick={() => handleClick('callBack')}
        >
          <img src={callBackBlack} alt='call back'></img> Request a Call Back
        </button>
        <button 
          className={`emailButton ${clickedButton === 'email' ? 'clicked' : ''}`} 
          onClick={() => handleClick('email')}
        >
          <img src={sendBlack} alt='send'></img>Receive Offer
        </button>
        <button 
          className={`callButton ${clickedButton === 'call' ? 'clicked' : ''}`} 
          onClick={() => handleClick('call')}
        >
          <img src={callBlack} alt='call arrow'></img>Call 0800 12245
        </button>
      </div>
    </div>
  )
}