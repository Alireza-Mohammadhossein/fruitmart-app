import React from 'react';
import Header from './components/header/Header';
import Slider from './components/slider/Slider';
import Shop from './pages/shop/Shop';

import { ToastContainer, toast } from 'react-toastify';


const App: React.FC = () => {
  
  return (
    <>
      <ToastContainer toastStyle={{ backgroundColor: 'var(--secondary-color)' }} />
      
      <Header />
      <Slider />
      <Shop />
      
    </>
  );
}

export default App;
