import React, { useState } from 'react';
import pen from '../../assets/pen.svg';
import './styles.css';

export const Chat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the displayMessage state with the user's message
    setDisplayMessage(userMessage);
    // Clear the input field after submission
    setUserMessage('');
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
          {/* <button className="userSendButton" type="submit">
            Send
          </button> */}
        </form>
      </div>
    </div>
  );
};