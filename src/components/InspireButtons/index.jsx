import React, { useState} from 'react'
import './styles.css'

export const InspireButtons = () => {
    const [activeButtons, setActiveButtons] = useState([])

    const handleButtonClick = (buttonIndex) => {
        if (activeButtons.includes(buttonIndex)) {
            setActiveButtons(activeButtons.filter(index => index !== buttonIndex))
        } else {
            setActiveButtons([...activeButtons, buttonIndex])
        }       
    }
    
  return (
    <div className='container'>
        <div className='leftSection'>
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
        <div className='rightSection'>
            <button className='rightButton'>Build trip</button>
        </div>
    </div>

  )
}

export default InspireButtons