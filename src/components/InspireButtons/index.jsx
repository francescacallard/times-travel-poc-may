import React, { useState} from 'react'
import './styles.css'
import aiSparkle from '../../assets/aiSparkle.svg'
import more from '../../assets/more.svg'
import moreArrow from '../../assets/moreArrow.svg'
import whiteAiSparkle from '../../assets/whiteAiSparkle.svg'
import { buttonTexts } from './constants'

export const InspireButtons = ({ selectedItems, setSelectedItems, handleSubmit }) => {
      
    const [activeButtons, setActiveButtons] = useState([])

    const handleButtonClick = (buttonIndex) => {
        if (activeButtons.includes(buttonIndex)) {
          setActiveButtons(activeButtons.filter(index => index !== buttonIndex));
          setSelectedItems(selectedItems.filter(item => item !== buttonTexts[buttonIndex]));
        } else {
          setActiveButtons([...activeButtons, buttonIndex]);
          setSelectedItems([...selectedItems, buttonTexts[buttonIndex]]);
        }
      };

    const handleBuildTripClick = () => {
        handleSubmit();
      };

      const randomItem = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
      console.log(randomItem)

     
    
  return (
    <div className='inspireContainerWhole'>
      <h2 className='inspireTitle'>How do you want to spend your time?</h2>
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
        <button
          className={`middleButtons ${activeButtons.includes(6) ? 'active' : ''}`}
          onClick={() => handleButtonClick(6)}
        >
          Hiking
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(7) ? 'active' : ''}`}
          onClick={() => handleButtonClick(7)}
        >
          Sports and Activities
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(8) ? 'active' : ''}`}
          onClick={() => handleButtonClick(8)}
        >
          Nature and sceneary
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(9) ? 'active' : ''}`}
          onClick={() => handleButtonClick(9)}
        >
          History
        </button>
        <button
          className={`middleButtons ${activeButtons.includes(10) ? 'active' : ''}`}
          onClick={() => handleButtonClick(10)}
        >
          Culture
        </button>
        </div>
        <img src={moreArrow} alt='more' className='more'/>
        <div className='rightSection'>
            <img src={whiteAiSparkle} alt='aiSparkle' className='aiSparkle'/>   
            <button onClick={handleBuildTripClick} className='rightButton'>Build trip</button>
        </div>
    </div>
    </div>

  )
}

export default InspireButtons