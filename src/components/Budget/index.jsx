import React, { useState } from 'react'
import './styles.css'

export const Budget = ({ selectedMonth, selectedBudget, setSelectedBudget }) => {
  const [activeButton, setActiveButton] = useState(null)

  const budgetOptions = [
    '£500 - £1000 pp',
    '£1000 - £2000 pp',
    '£2000 - £3000 pp',
    '£3000+ pp',
    'Not sure',
  ];

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex === activeButton ? null : buttonIndex);
    setSelectedBudget(budgetOptions[buttonIndex]);
  };
  console.log(selectedMonth, 'from budget component')

  return (
    <div className='budgetContainer'>
      <h2 className='heading'>{`${selectedMonth} is a great month for a relaxing trip away`}</h2>
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