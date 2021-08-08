import { useEffect, useState } from 'react';

export const useTimer = (seconds) => {
  const [timer, setTimer] = useState(seconds);
  const [startCounter, setStartCounter] = useState(false);

  const startCounterHandler = () => {
    setStartCounter(true);
  };

  useEffect(() => {
    let intervalTimeDown = null;

    if (startCounter) {
      intervalTimeDown = setInterval(() => {
        setTimer((prevState) => prevState - 1);
        if (timer === 0) {
          setStartCounter(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalTimeDown);
    };
  }, [startCounter, timer]);

  useEffect(() => {
    setTimer(seconds);
  }, [seconds]);

  return {
    timer,
    setTimer,
    startCounterHandler,
  };
};
