import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LinearProgress } from "@mui/material";

import { clearCart } from '../../store/cartSlice';
import { RootState } from '../../store/store';
import useFetchStock from '../../hooks/useFetchStock';




const TIMER_STORAGE_KEY = 'fruitmart_timer';

type TimerState = {
  timer: number;
  isTimerRunning: boolean;
};

const loadTimerState = (): TimerState => {
  try {
    const serializedState = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!serializedState) return { timer: 300, isTimerRunning: false };
    const parsed = JSON.parse(serializedState);

    return {
      timer: typeof parsed.timer === 'number' ? parsed.timer : 300,
      isTimerRunning: typeof parsed.isTimerRunning === 'boolean' ? parsed.isTimerRunning : false,
    };
  } catch (error) {
    console.error('Failed to load timer state from localStorage:', error);
    return { timer: 300, isTimerRunning: false };
  }
};

const saveTimerState = (state: TimerState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(TIMER_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save timer state to localStorage:', error);
  }
};

const Timer: React.FC = () => {
  const { fetchStock } = useFetchStock();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [timerState, setTimerState] = useState<TimerState>(loadTimerState);
  const { timer, isTimerRunning } = timerState;

  const updateTimer = (
    partial: Partial<TimerState> | ((prev: TimerState) => Partial<TimerState>)
  ) => {
    setTimerState(prev => ({
      ...prev,
      ...(typeof partial === 'function' ? partial(prev) : partial),
    }));
  };

  const progress = (timer / 300) * 100;

  useEffect(() => {
    saveTimerState(timerState);
  }, [timerState]);

  // Start timer when the first item is added to the cart
  useEffect(() => {
    if (cartItems.length > 0) {
      updateTimer({ isTimerRunning: true });
    } else {
      updateTimer({ isTimerRunning: false, timer: 300 }); // Reset the timer when the cart is empty
    }
  }, [cartItems]);


  // Decrement timer every second when running
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      updateTimer(prev => ({ timer: prev.timer > 0 ? prev.timer - 1 : 0 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);


  const handleEmptyCart = () => {
    fetchStock();
    dispatch(clearCart());
  };

  // Clear cart and reset stock when timer reaches 0
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (timer === 0) {
      toast.warning("Your cart has expired!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      handleEmptyCart();
      updateTimer({ timer: 300, isTimerRunning: false });
    }
  }, [timer, dispatch]);


  // Format timer into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };



  return (
    <div className='header__timer'>
       {isTimerRunning && (
        <>
          <LinearProgress
            variant="determinate"
            value={progress}
          />

          <p>
            Cart expires in: <strong>{formatTime(timer)}</strong>
          </p>
        </>
      )}
    </div>
  );
}

export default Timer;