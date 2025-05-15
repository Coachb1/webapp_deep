import React, { useEffect, useState } from 'react';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [dayName, setDayName] = useState('');
  const [visible, setVisible] = useState(true);

  const getNextMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = (8 - day) % 7 || 7;
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + diff);
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday;
  };

  const updateCountdown = () => {
    const now = new Date();
    const target = getNextMonday().getTime();
    const distance = target - now.getTime();

    if (distance <= 0) {
      setTimeLeft('00d 00h 00m 00s');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setTimeLeft(`${days}d ${hours}h`);
    setDayName(now.toLocaleDateString('en-US', { weekday: 'long' }));
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      backgroundColor: '#d4fddf',
      color: '#000',
      padding: '10px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      position: 'relative',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    }} className='mt-4 mb-2'>
      🎉 HAPPY {dayName.toUpperCase()}! YOU HAVE ONLY 
      <span style={{ color: '#008000', marginLeft: '6px', marginRight: '6px' }}>
        {timeLeft}
      </span>
      LEFT BEFORE THESE LESSONS AND SIMULATIONS LEAVE FOREVER!
      {/* <span
        onClick={() => setVisible(false)}
        style={{
          marginLeft: '15px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#444',
        }}
        title="Dismiss"
      >
        ✖
      </span> */}
    </div>
  );
};

export default CountdownBanner;
