import React, { useState } from 'react';
import { Dropdown, Button, Space, Menu } from 'antd';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { DurationMenu } from 'components/DurationMenu';
import InspireButtons from 'components/InspireButtons';
import './styles.css';
import { months } from '../Destinations/constants';
import { Budget } from 'components/Budget';
// import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { Loading } from 'components/Loading';
import axios from 'axios';

export const DropdownMonth = ({
  selectedMonth,
  setSelectedMonth,
  selectedBudget,
  setSelectedBudget,
  selectedDuration,
  setSelectedDuration,
  selectedItems,
  setSelectedItems,
  setAiResponse,
  setShowDestinations,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMonthChange = ({ key }) => {
    setSelectedMonth(key);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    const systemPrompt = {
      role: 'system',
      content: `You are a travel agent that takes information based on the users choices. You need to write back what month they chose and for how long before you recommend them an itinerary`,
    };

    const userMessage = {
      role: 'user',
      content: `The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}. They are interested in the following: ${selectedItems.join(', ')}. Their budget is ${selectedBudget}. You have to give 5 examples of country and continent. You do not need to write anything else other than "1: Country, Continent 2: Country, Continent 3: Country, Continent 4: Country, Continent 5: Country, Continent"`,
    };
    try {
    const messages = [systemPrompt, userMessage];
    const response = await axios.post('http://localhost:5000/api/chat', { messages });
    const aiResponse = response.data.aiResponse;
    console.log('AI response:', aiResponse);
    setAiResponse(aiResponse);
    setShowDestinations(true);
    setIsLoading(false);
  } catch (error) {
    console.error('Error:', error);
  }
};

  const menu = (
    <Menu onClick={handleMonthChange}>
      {months.map((month) => (
        <Menu.Item key={month}>{month}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className='textContainer'>
        <p className='specifyTextBox'>Specify your preferred travel month and the duration of your trip</p>
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
          <DurationMenu onDurationChange={handleDurationChange} />
        </div>
        <p className='inspireTextBox'>Select three of the options that match what you're looking for in your next adventure!</p>
        <InspireButtons selectedItems={selectedItems} setSelectedItems={setSelectedItems} handleSubmit={handleSubmit} />
      </div>
      <Budget selectedMonth={selectedMonth} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />
      {isLoading ? <Loading /> : null}
    </>
  );
};