// src/components/ButtonTap.js
import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const TAP_MUTATION = gql`
  mutation Tap($userId: ID!) {
    tap(userId: $userId) {
      success
      balance
    }
  }
`;

const ButtonTap = ({ userId }) => {
  const [tap] = useMutation(TAP_MUTATION);
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseInt(savedBalance, 10) : 0;
  });

  // When the balance changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]);

  const handleTap = async () => {
    try {
      // Call the mutation to tap and update the balance on the server
      const result = await tap({ variables: { userId } });
      
      if (result.data.tap.success) {
        // If successful, update the local balance with the server value
        setBalance(result.data.tap.balance);
      } else {
        console.log("Failed to tap the button");
      }
    } catch (error) {
      console.error("Error while tapping:", error);
    }
  };

  return (
    <div>
      <h2>Your Balance: {balance} coins</h2>
      <button onClick={handleTap}>Tap to Earn Coins</button>
    </div>
  );
};

export default ButtonTap;
