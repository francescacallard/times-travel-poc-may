import React, { useState} from 'react'
import './styles.css'
import aiSparkle from '../../assets/aiSparkle.svg'
import more from '../../assets/more.svg'

export const InspireButtons = ({ handleSubmit }) => {
    const [activeButtons, setActiveButtons] = useState([])

    const handleButtonClick = (buttonIndex) => {
        if (activeButtons.includes(buttonIndex)) {
            setActiveButtons(activeButtons.filter(index => index !== buttonIndex))
        } else {
            setActiveButtons([...activeButtons, buttonIndex])
        }       
    }

    const handleBuildTripClick = () => {
        handleSubmit();
      };
    
  return (
    <div className='inspireContainer'>
        <div className='leftSection'>
            <img src={aiSparkle} alt='aiSparkle' className='aiSparkle'/>
            <button className='leftButton'>Inspire me</button>
        </div>

        <div className='whiteLine'></div>
        <div className='middleSection'>
        <button
          className={`middleButtons ${activeButtons.includes(0) ? 'active' : ''}`}
          onClick={() => handleButtonClick(0)}
        >
          Solo travel
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(1) ? 'active' : ''}`}
          onClick={() => handleButtonClick(1)}
        >
          Hidden gems
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(2) ? 'active' : ''}`}
          onClick={() => handleButtonClick(2)}
        >
          Food and wine
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(3) ? 'active' : ''}`}
          onClick={() => handleButtonClick(3)}
        >
          Romantic getaway for two
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(4) ? 'active' : ''}`}
          onClick={() => handleButtonClick(4)}
        >
          Nightlife
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(5) ? 'active' : ''}`}
          onClick={() => handleButtonClick(5)}
        >
          Relaxation
        </button>
        </div>
        <img src={more} alt='more' className='more'/>
        <div className='rightSection'>
            <img src={aiSparkle} alt='aiSparkle' className='aiSparkle'/>   
            <button onClick={handleBuildTripClick} className='rightButton'>Build trip</button>
        </div>
    </div>

  )
}

export default InspireButtons