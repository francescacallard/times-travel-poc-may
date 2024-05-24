import React, { useState } from "react"
import { OpenAIClient, AzureKeyCredential } from "@azure/openai"

export const OpenAIComponent = () => {
  const [generatedText, setGeneratedText] = useState("")

  const deploymentId = "gpt-4-with-vision";
  const endpoint = `${process.env.REACT_APP_AZURE_OPENAI_ENDPOINT}${deploymentId}`
  const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY

  const sendChatCompletion = async (messages) => {
    try {
      const apiVersion = "2024-02-01";

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey), {
    apiVersion: apiVersion,
  });
      const response = await client.getChatCompletions(deploymentId, messages, { maxTokens: 4000 });
      const generatedText = response.choices[0].message.content;
      console.log("Generated Text:", generatedText);
      setGeneratedText(generatedText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
    ];
    sendChatCompletion(messages);
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Text</button>
      <p>{generatedText}</p>
    </div>
  );
};