import { useDispatch } from 'react-redux';
import { updateStock } from '../store/stockSlice';
import { mockApi } from '../mocks/stockApi';

const useFetchStock = () => {
  const dispatch = useDispatch();

  const fetchStock = async () => {
    try {
      const stockLevels = await mockApi.getStockLevels();
      dispatch(updateStock(stockLevels));
    } catch (error) {
      console.error('Failed to fetch stock levels:', error);
    }
  };

  return { fetchStock };
};

export default useFetchStock;
