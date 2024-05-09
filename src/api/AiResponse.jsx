import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import React, { useState } from 'react';
import './styles.css';

export const AiResponse = ({ selectedMonth, selectedDuration }) => {
  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
  const [aiResponse, setAiResponse] = useState('');

  console.log('from the ai', selectedMonth, selectedDuration);

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You are to recommend them an itinerary`,
  };

  const handleSubmit = async (event) => {
    const userMessage = {
      role: 'user',
      content: `The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}.`,
    };

    event.preventDefault();

    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      console.log('Hit3');

      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const aiResponse = result.choices[0].message.content;
      setAiResponse(aiResponse);
      console.log(aiResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <></>
  );
};