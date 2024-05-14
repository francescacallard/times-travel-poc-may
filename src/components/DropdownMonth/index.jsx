import React, { useState } from 'react';
import { Dropdown, Button, Space, Menu } from 'antd';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { DurationMenu } from 'components/DurationMenu';
import InspireButtons from 'components/InspireButtons';
import './styles.css';
import { months } from '../Destinations/constants';
import { Budget } from 'components/Budget';
import { Destinations } from 'components/Destinations';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { Loading } from 'components/Loading';

export const DropdownMonth = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedDuration, setSelectedDuration] = useState('7 days');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMonthChange = ({ key }) => {
    setSelectedMonth(key);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to write back what month they chose and for how long before you recommend them an itinerary`,
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    const userMessage = {
      role: 'user',
      content: `The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}. They are interested in the following: ${selectedItems.join(', ')}. Their budget is ${selectedBudget}. You have to give 5 examples of country and continent`,
    };
    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      console.log('User selection sent to the AI');
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const aiResponse = result.choices[0].message.content;
      console.log('AI response:', aiResponse)
      setAiResponse(aiResponse);
      setShowDestinations(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const menu = (
    <Menu onClick={handleMonthChange}>
      {months.map(month => (
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
      {isLoading ? (
        <Loading />
      ) : (
        showDestinations && (
          <Destinations
            selectedMonth={selectedMonth}
            selectedDuration={selectedDuration}
            selectedItems={selectedItems}
            selectedBudget={selectedBudget}
            aiResponse={aiResponse}
          />
        )
      )}
    </>
  );
};