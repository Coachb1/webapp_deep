import React, { useEffect, useState } from 'react';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [dayName, setDayName] = useState('');
  const [visible, setVisible] = useState(true);

  const getNextMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = (8 - day) % 7 || 7; // ensures Monday is always in the future
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
    <div
      className="
    mt-4 mb-4 px-4 py-3 bg-[#d4fddf] text-black font-semibold text-sm sm:text-base
    flex justify-center items-center gap-2 relative
    overflow-hidden shadow-md text-center
    w-full max-w-[80%] mx-auto rounded-md border border-green-300
  "
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-wrap justify-center items-center text-center">
        🎉 Welcome to your Co-Creation Sandbox! Content refreshed on fixed cadence. Countdown:
        <span className="text-green-700 mx-2">{timeLeft}</span>
        
      </div>
    </div>
  );
};

export default CountdownBanner;
