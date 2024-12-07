import React from 'react';
import './Slider.scss';


const Slider: React.FC = () => {
  return (
    <div className='slider'>
      <p className='slider__heading'>Find your organic and fresh fruits here</p>

      <a className='btn btn--secondary' href='#shop'>
        Start shopping
      </a>
    </div>
  );
}

export default Slider;