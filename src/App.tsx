import React from 'react';

import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';
import Slider from './components/slider/Slider';
import Shop from './pages/shop/Shop';



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
