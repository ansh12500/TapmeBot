// src/components/TelegramIntegration.js
import React from 'react';

const TelegramIntegration = () => {
  const handleTelegramLogin = () => {
    window.open('https://t.me/AnshuTapMe_bot');
  };

  return (
    <div>
      <button onClick={handleTelegramLogin}>Connect with Telegram</button>
    </div>
  );
};

export default TelegramIntegration;
