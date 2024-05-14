import React, { useState } from 'react';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';

const AiChat = ({ selectedMonth, selectedDuration }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [country, setCountry] = useState('');
  const [month, setMonth] = useState('');
  const [activity, setActivity] = useState('');

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to write back what month they chose and for how long before you recommend them an itinerary`,
  };

  const handleAiResponse = async () => {
    const userMessage = {
      role: 'user',
      content: `The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}.`,
    };

    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const aiResponse = result.choices[0].message.content;
      setAiResponse(aiResponse);

      // Extract country, month, and activity from the AI response
      const countryRegex = /\b(France|Germany|Spain|Italy|Greece|Portugal|United Kingdom|Ireland|Netherlands|Belgium|Switzerland|Austria|Denmark|Sweden|Norway|Finland|Poland|Czech Republic|Hungary|Croatia|Romania|Bulgaria|Turkey|Egypt|Morocco|South Africa|United States|Canada|Mexico|Brazil|Argentina|Chile|Peru|Colombia|Australia|New Zealand|Japan|China|India|Thailand|Indonesia|Malaysia|Singapore|Philippines|Vietnam)\b/gi;
      const monthRegex = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/gi;
      const activityRegex = /\b(hiking|swimming|fishing|sailing|surfing|skiing|snowboarding|camping|sightseeing|shopping|dining|nightlife|museums|art galleries|theater|concerts|festivals|sports|adventure|relaxation|spa|wellness|beach|mountains|lakes|rivers|forests|deserts|islands|cities|towns|villages|countryside|wildlife|nature|history|culture|food|wine|beer|coffee|tea|chocolate|cheese|bread|pastries|ice cream|gelato|pizza|pasta|seafood|meat|vegetarian|vegan)\b/gi;

      const countryMatch = aiResponse.match(countryRegex);
      const monthMatch = aiResponse.match(monthRegex);
      const activityMatch = aiResponse.match(activityRegex);

      setCountry(countryMatch ? countryMatch[0] : '');
      setMonth(monthMatch ? monthMatch[0] : '');
      setActivity(activityMatch ? activityMatch[0] : '');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Call handleAiResponse when component mounts
  useState(() => {
    handleAiResponse();
  }, [selectedMonth, selectedDuration]);

  return (
    <div>
      {/* Render aiResponse or loading indicator */}
      {aiResponse ? <p>{aiResponse}</p> : <p>Loading...</p>}

      {/* Render country, month, and activity */}
      {country && <p>Country: {country}</p>}
      {month && <p>Month: {month}</p>}
      {activity && <p>Activity: {activity}</p>}
    </div>
  );
};

export default AiChat;