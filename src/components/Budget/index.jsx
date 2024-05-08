import React, { useState } from 'react'
import './styles.css'

export const Budget = () => {
  const [activeButton, setActiveButton] = useState(null)

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex === activeButton ? null : buttonIndex)
  }

  return (
    <div className='budgetContainer'>
      <h2 className='heading'>May is a great month for a relaxing trip away</h2>
      <h3 className='subHeading'>To give you the best recommendations it would be great to get an idea of your budget</h3>
      <div className='buttonContainerBudget'>
        <button
          className={`budgetButtons ${activeButton === 0 ? 'active' : ''}`}
          onClick={() => handleButtonClick(0)}
        >
          £500 - £1000 pp
        </button>
        <button
          className={`budgetButtons ${activeButton === 1 ? 'active' : ''}`}
          onClick={() => handleButtonClick(1)}
        >
          £1000 - £2000 pp
        </button>
        <button
          className={`budgetButtons ${activeButton === 2 ? 'active' : ''}`}
          onClick={() => handleButtonClick(2)}
        >
          £2000 - £3000 pp
        </button>
        <button
          className={`budgetButtons ${activeButton === 3 ? 'active' : ''}`}
          onClick={() => handleButtonClick(3)}
        >
          £3000+ pp
        </button>
        <button
          className={`budgetButtons ${activeButton === 4 ? 'active' : ''}`}
          onClick={() => handleButtonClick(4)}
        >
          Not sure
        </button>
      </div>
      <h3 className='informationHeading'>Destinations will be personalised for you based on trusted sources from Times Travel</h3>
    </div>
  )
}