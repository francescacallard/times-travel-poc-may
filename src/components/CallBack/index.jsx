import React from 'react'
import './styles.css'
import call from '../../assets/call.svg'
import callA from '../../assets/callA.svg'
import send from '../../assets/send.svg'


export const CallBack = () => {
  return (
    <div className='callBackContainer'>
      <h2 className='callBackHeading'>It’s much easier to tailor your trip to your needs over the phone, from flights, to hotels to experiences, we can ensure you have the perfect trip</h2>
      <p className='callBackSubheading'>You can call us on the number below or request a call back!</p>
      <div className='callBackButtonContainer'>
        <button className='callBackButton'>
          <img src={callA}></img> Request a Call Back
        </button>
        <button className='callBackButton'>
          <img src={send}></img>Recieve Offer</button>
        <button className='callBackButton'>
          <img src={call} alt='call arrow'></img>Call 0800 12245
        </button>
      </div>
    </div>
  )
}

