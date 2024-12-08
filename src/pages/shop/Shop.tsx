import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../../store/cartSlice';
import { reduceStock, updateStock } from '../../store/stockSlice';
import { RootState, AppDispatch } from '../../store/store';

import { fruits, mockApi } from '../../mocks/stockApi';

import FruitCard from '../../components/fruitCard/FruitCard';

import './Shop.scss';





const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stock = useSelector((state: RootState) => state.stock);


  const [loading, setLoading] = useState(true);

  // Fetch stock levels periodically using the mock API
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stockLevels = await mockApi.getStockLevels();
        dispatch(updateStock(stockLevels));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stock levels:', error);
        setLoading(false);
      }
    };

    // Fetch stock levels initially
    fetchStock();

    //Set 5 minutes timer to refetch the stock
    const interval = setInterval(fetchStock, 300000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);
  

  const handleAddToCart = (id:number ,name: string, price: number) => {
    if (stock[id] > 0) {
      dispatch(addItem({ id, name, price, quantity: 1 }));
      dispatch(reduceStock(id));
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
              key={fruit.id}
              id={fruit.id}
              name={fruit.name}
              price={fruit.price}
              image={fruit.image}
              stock={stock[fruit.id]}
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
