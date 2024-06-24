import React, { useState } from 'react';
import { Dropdown, Button, Space, Menu } from 'antd';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { DurationMenu } from 'components/DurationMenu';
import InspireButtons from 'components/InspireButtons';
import './styles.css';
import { months, countries } from '../Destinations/constants';
import { Loading } from 'components/Loading';
import axios from 'axios';
import pin from '../../assets/pin.svg';
import sundayTimesLogo from '../../assets/sundayTimesLogo.svg';
import joanna from '../../assets/joanna.png';
import signature from '../../assets/signature.svg';
import { useApp } from 'AppContext';

export const DropdownMonth = ({
}) => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDuration,
    setSelectedDuration,
    selectedItems,
    setSelectedItems,
    setAiResponse,
    setShowDestinations,
    handleSubmitCountry,
  } = useApp();
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleMonthChange = ({ key }) => {
    setSelectedMonth(key);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };


const handleRegenerateCountries = () => {
  handleSubmitCountry();
}

  const menu = (
    <Menu onClick={handleMonthChange}>
      {months.map((month) => (
        <Menu.Item key={month}>{month}</Menu.Item>
      ))}
    </Menu>
  );

  const destinationMenu = (
    <Menu onClick={(e) => setSelectedDestination(e.key)} style={{ maxHeight: '320px', overflowY: 'auto' }}>
      <Menu.Item key="Any destination">Any destination</Menu.Item>
      {countries.map((country) => (
        <Menu.Item key={country}>{country}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className='textContainer'>
        <div className='sundayTimesContainer'>
        <img src={sundayTimesLogo} alt='sundayTimesLogo' className='sundayTimesLogo' />
        <h1 className='sundayTimesTitle'>Build your trip with the Times Travel Planner</h1>
        <p className='sundayTimesIntroduction'>Welcome to the Times Travel Planner. Create your perfect holiday with tailor-made itineraries, trusted travel suggestions, and exclusive offers from our vetted and trusted ATOL protected partners, all powered by expert  Times Travel journalism to ensure quality and trust. We hope you find the perfect trip </p>
        <div className='joannaBox'>
        <img src={joanna} alt='joanna' className='joanna' />
        <div className='joannaText'>
          <p className='joannaName'>Joanna Miles</p>
          <p className='joannaTitle'>Times Travel Editor</p>
          <img src={signature} alt='signature' className='signature' />
          </div>
        </div>
        </div>
        
        <p className='inspireTextBox'>Where do you want to go?</p>
        <div className='container'>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              <Space>
                <CalendarOutlined />
                <span className='month-text'>{selectedMonth}</span>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown overlay={destinationMenu} trigger={['click']}>
            <Button>
              <Space>
                <img src={pin} alt='pin' className='pin' />
                <span className='country-text'>{selectedDestination || "Any Destination"}</span>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <DurationMenu onDurationChange={handleDurationChange} />
        </div>
        </div>
        <InspireButtons selectedItems={selectedItems} setSelectedItems={setSelectedItems} handleSubmitCountry={handleSubmitCountry} />
      {/* <Budget selectedMonth={selectedMonth} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} /> */}
      {isLoading ? <Loading /> : null}
    </>
  );
};