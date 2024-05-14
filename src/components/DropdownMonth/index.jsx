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
  const [country, setCountry] = useState('');
  const [month, setMonth] = useState('');
  const [activity, setActivity] = useState('');

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
      content:`The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}. They are interested in the following: ${selectedItems.join(', ')}. Their budget is ${selectedBudget}.`,
    };

    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      const messages = [systemPrompt, userMessage];

      const result = await client.getChatCompletions(deploymentId, messages);
      const aiResponse = result.choices[0].message.content;
      console.log("This is the AI response", aiResponse); 
      setAiResponse(aiResponse);

      const countryRegex = /\b(France|Germany|Spain|Italy|Greece|Portugal|United Kingdom|Ireland|Netherlands|Belgium|Switzerland|Austria|Denmark|Sweden|Norway|Finland|Poland|Czech Republic|Hungary|Croatia|Romania|Bulgaria|Turkey|Egypt|Morocco|South Africa|United States|Canada|Mexico|Brazil|Argentina|Chile|Peru|Colombia|Australia|New Zealand|Japan|China|India|Thailand|Indonesia|Malaysia|Singapore|Philippines|Vietnam)\b/gi;
      const monthRegex = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/gi;
      const activityRegex = /\b(hiking|swimming|fishing|sailing|surfing|skiing|snowboarding|camping|sightseeing|shopping|dining|nightlife|museums|art galleries|theater|concerts|festivals|sports|adventure|relaxation|spa|wellness|beach|mountains|lakes|rivers|forests|deserts|islands|cities|towns|villages|countryside|wildlife|nature|history|culture|food|wine|beer|coffee|tea|chocolate|cheese|bread|pastries|ice cream|gelato|pizza|pasta|seafood|meat|vegetarian|vegan)\b/gi;

      const countryMatch = aiResponse.match(countryRegex);
      const monthMatch = aiResponse.match(monthRegex);
      const activityMatch = aiResponse.match(activityRegex);

      setCountry(countryMatch ? countryMatch[0] : '');
      setMonth(monthMatch ? monthMatch[0] : '');
      setActivity(activityMatch ? activityMatch[0] : '');

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
      <div>
      {/* Render aiResponse or loading indicator */}
      {aiResponse ? <p>{aiResponse}</p> : <p>Loading...</p>}

      {/* Render country, month, and activity */}
      {country && <p>Country: {country}</p>}
      {month && <p>Month: {month}</p>}
      {activity && <p>Activity: {activity}</p>}
    </div>
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
      <InspireButtons selectedItems={selectedItems} setSelectedItems={setSelectedItems} handleSubmit={handleSubmit}/>
    </div>
    <Budget selectedMonth={selectedMonth} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />
    {isLoading ? (
        <Loading />
      ) : (
        showDestinations && <Destinations selectedMonth={selectedMonth} />
      )}
    </>
  );
};