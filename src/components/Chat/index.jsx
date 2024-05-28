import React, { useState } from 'react';
import pen from '../../assets/pen.svg';
import './styles.css';
import axios from 'axios';

export const Chat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [question, setQuestion] = useState('');

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisplayMessage(userMessage);
    setUserMessage('');

    const systemPrompt = {
      role: 'system',
      content: 'You just need to write what the user asked and the word "Hello" back.',
    };

    try {
      const messages = [{ role: 'user', content: question }, systemPrompt];
      const response = await axios.post('http://localhost:5000/api/chat', { messages });
      const aiResponse = response.data.aiResponse;
      console.log('AI response:', aiResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="userChatContainer">
      <div className="userMessageShowContainer">
        <p>{displayMessage}</p>
      </div>
      <div className="userInputContainer">
        <form className="userChatForm" onSubmit={handleSubmit}>
          <img className="penIcon" src={pen} alt="Pen Icon" />
          <input
            className="userChatInput"
            type="text"
            placeholder="Type your message here"
            value={userMessage}
            onChange={handleInputChange}
          />
          {/* <button className="userSendButton" type="submit">Send</button> */}
        </form>
      </div>
    </div>
  );
};