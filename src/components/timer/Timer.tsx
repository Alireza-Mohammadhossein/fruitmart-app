import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LinearProgress } from "@mui/material";

import { clearCart } from '../../store/cartSlice';
import { increaseStock } from '../../store/stockSlice';
import { RootState } from '../../store/store';




const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const [timer, setTimer] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const progress = (timer / 300) * 100;
  

  // Start timer when the first item is added to the cart
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
      setTimer(300); // Reset the timer when the cart is empty
    }
  }, [cartItems]);


  // Decrement timer every second when running
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);


  const handleEmptyCart = () => {
    cartItems.forEach(item => {
      dispatch(increaseStock({ id: item.id, quantity: item.quantity }));
    });
    
    dispatch(clearCart());
    // if (closeDialog) closeDialog();
  };



  // Clear cart and reset stock when timer reaches 0
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

      setTimer(300);
      
      setIsTimerRunning(false);
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