import React, { useState } from 'react'
import './styles.css'
import callBlack from '../../assets/callBlack.svg'
import callBackBlack from '../../assets/callBackBlack.svg'
import sendBlack from '../../assets/sendBlack.svg'


export const CallBack = ({itinerary}) => {
  const handleClick = () => {
    setIsClicked(true);
    console.log('Call Back Requested:', itinerary);
  }

  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className='callBackContainer'>
      <h2 className='callBackHeading'>It’s much easier to tailor your trip to your needs over the phone, from flights, to hotels to experiences, we can ensure you have the perfect trip</h2>
      <p className='callBackSubheading'>You can call us on the number below or request a call back!</p>
      <div className='callBackButtonContainer'>
        <button  className={`callBackButton ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
          <img src={callBackBlack}></img> Request a Call Back
        </button>
        <button className='callBackButton' onClick={handleClick}>
          <img src={sendBlack}></img>Recieve Offer</button>
        <button className='callBackButton'>
          <img src={callBlack} alt='call arrow'></img>Call 0800 12245
        </button>
      </div>
    </div>
  )
}

