import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CUIView.css';

const CUIView = ({ cui }) => {
  const { name, description, traits, communicationStyle, goal, primaryColor, secondaryColor, temperature, topP, maxLength } = cui;
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/chatgpt", {
          prompt: `Name: ${name}\nDescription: ${description}\nTraits: ${traits.join(', ')}\nCommunication Style: ${communicationStyle}\nGoal: ${goal}`,
          temperature,
          topP,
          maxLength,
        });

        const newMessage = { role: 'ai', content: response.data.content };
        setMessages([newMessage]);
        localStorage.setItem('messages', JSON.stringify([newMessage]));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name, description, traits, communicationStyle, goal, temperature, topP, maxLength]);

  const handleSendMessage = async (message) => {
    try {
      const response = await axios.post("http://localhost:3001/api/chatgpt", {
        prompt: message,
        temperature,
        topP,
        maxLength,
      });

      const newMessages = [...messages, { role: 'user', content: message }, { role: 'ai', content: response.data.content }];
      setMessages(newMessages);
      localStorage.setItem('messages', JSON.stringify(newMessages));

    } catch (error) {
      console.error("Error sending message:", error);
    } 

    const textarea = document.querySelector('textarea[name="message"]');
    textarea.style.height = '40px'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const clearMessages = () => {
    localStorage.removeItem('messages');
    setMessages([]);
  }

  return (
    <div className="cui-view">
      <div className="cui-header">
        <h2>{name}</h2>
        <button onClick={clearMessages}>Clear Messages</button>
      </div>
      <div className="cui-messages">
        {messages.map((message, index) => (
          <div key={index} className={`cui-message ${message.role}`} style={message.role === 'ai' ? {backgroundColor: secondaryColor} : {backgroundColor: primaryColor}}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(e.target.elements.message.value); }}>
        <textarea name="message" placeholder='Send a message'></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default CUIView;
