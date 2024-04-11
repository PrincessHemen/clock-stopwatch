import React, { useState, useEffect } from 'react';
import './Stopwatch.css';
import pause from '../Assets/pause.png';
import play from '../Assets/play.png';
import stop from '../Assets/stop.png';

const Stopwatch = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime(prevTime => {
          let { hours, minutes, seconds } = prevTime;
          seconds++;
          if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
              minutes = 0;
              hours++;
            }
          }
          return { hours, minutes, seconds };
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const toggleRunning = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const resetTime = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setRunning(false);
  };

  const formatTime = num => {
    return num < 10 ? '0' + num : num;
  };

  return (
    <div className='container'>
        <div className="stopwatch">
        <h1 id='displayTime'>
          {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
        </h1>
        <div className="buttons">
          <img src={stop} alt="stop playing icon" onClick={resetTime} />
          <img src={play} alt="play icon" onClick={toggleRunning} style={{ display: running ? 'none' : 'inline-block' }} />
          <img src={pause} alt="pause icon" onClick={toggleRunning} style={{ display: running ? 'inline-block' : 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
