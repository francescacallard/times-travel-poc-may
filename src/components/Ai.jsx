import React, { useState } from 'react';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';

const AiChat = ({ selectedMonth, selectedDuration }) => {
  const [aiResponse, setAiResponse] = useState('');

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to write back what month they chose and for how long before you recommend them an itinerary`,
  };

  const handleAiResponse = async () => {
    const userMessage = { role: 'user', content: `The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}.` };
    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const aiResponse = result.choices[0].message.content;
      setAiResponse(aiResponse);
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
    </div>
  );
};

export default AiChat;
