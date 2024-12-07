import React, { useEffect, useState } from 'react';
import './Shop.scss';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { reduceStock, updateStock } from '../../store/stockSlice'; // Import the updateStock action
import { RootState, AppDispatch } from '../../store/store';
import mockStock from '../../mocks/stockApi'; // Import the mock API
import FruitCard from '../../components/fruitCard/FruitCard';

import appleImage from '../../assets/images/apples.png';
import orangeImage from '../../assets/images/oranges.png';
import mangoImage from '../../assets/images/mangos.png';



const fruits = [
  {
    name: 'apple',
    price: 2,
    image: appleImage,
  },
  {
    name: 'orange',
    price: 1.5,
    image: orangeImage,
  },
  {
    name: 'mango',
    price: 5,
    image: mangoImage,
  },
];

const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stock = useSelector((state: RootState) => state.stock);

  const [loading, setLoading] = useState(true);

  // Fetch stock levels periodically using the mock API
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stockLevels = await mockStock.getStockLevels(); // Call the mock API
        dispatch(updateStock(stockLevels)); // Update stock in Redux store
        setLoading(false); // Data fetched, disable loading
      } catch (error) {
        console.error('Failed to fetch stock levels:', error);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    // Fetch stock levels initially
    fetchStock();
    const interval = setInterval(fetchStock, 300000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  const handleAddToCart = (name: string, price: number) => {
    if (stock[name] > 0) {
      dispatch(addItem({ name, price, quantity: 1 }));
      dispatch(reduceStock(name));
    } else {
      alert(`${name} is out of stock`);
    }
  };



  return (
    <div className="shop" id="shop">
      <div className="shop__container">
        <div className="shop__list">
          {fruits.map((fruit) => (
            <FruitCard
              key={fruit.name}
              name={fruit.name}
              price={fruit.price}
              image={fruit.image}
              stock={stock[fruit.name]}
              loading={loading}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
