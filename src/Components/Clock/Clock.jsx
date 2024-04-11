import React, { useRef, useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  // Create refs for hours, minutes, and seconds
  const hrsRef = useRef(null);
  const minRef = useRef(null);
  const secRef = useRef(null);

  // State to hold current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to format time to two digits
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // Update clock UI
  useEffect(() => {
    const hours = formatTime(currentTime.getHours());
    const minutes = formatTime(currentTime.getMinutes());
    const seconds = formatTime(currentTime.getSeconds());

    hrsRef.current.textContent = hours;
    minRef.current.textContent = minutes;
    secRef.current.textContent = seconds;
  }, [currentTime]);

  return (
    <div className='hero'>
      <div className="box">
        <div className="clock">
          <span ref={hrsRef} id='hrs'>00</span> 
          <span>:</span>
          <span ref={minRef} id='min'>00</span>
          <span>:</span>
          <span ref={secRef} id='sec'>00</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
