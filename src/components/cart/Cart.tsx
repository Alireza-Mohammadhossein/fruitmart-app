import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/store';
import { removeItem, clearCart } from '../../store/cartSlice';
import { increaseStock } from '../../store/stockSlice';
import { addItem } from '../../store/cartSlice';
import { reduceStock } from '../../store/stockSlice';

import { Table, TableBody, TableCell, TableHead, TableRow }  from '@mui/material';

import './Cart.scss';



const Cart: React.FC = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const stock = useSelector((state: RootState) => state.stock);

  const handleDecrement = (itemID: number) => {
    const itemInCart = cart.items.find(item => item.id === itemID);
    if (itemInCart && itemInCart.quantity > 0) {
      dispatch(removeItem(itemID));
      dispatch(increaseStock({ id: itemID, quantity: 1 }));
    }
  };

  const handleEmptyCart = () => {
    cart.items.forEach(item => {
      dispatch(increaseStock({ id: item.id, quantity: item.quantity }));
    });
    dispatch(clearCart());
  };


  const handleAddToCart = (id:number ,name: string, price: number) => {
    if (stock[id] > 0) {
      dispatch(addItem({ id, name, price, quantity: 1 }));
      dispatch(reduceStock(id));
    } else {
      alert(`${name} is out of stock`);
    }
  };


  return (
    <div className='cart'>

      {
        cart.items.length === 0 ? (
          <p className='cart__header text-center'>Your cart is empty!</p>
        )
        : (
          <>
            <div className='cart__header'>Shopping cart</div>

            <div className='cart__content'>
              <Table className='cart__table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Fruit</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {cart.items.map(item => (
                    <TableRow
                      key={item.id}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">${item.quantity * item.price}</TableCell>
                      <TableCell align="right">
                        <button
                          className='btn btn--secondary'
                          onClick={() => handleDecrement(item.id)}
                        >
                          --
                        </button>
                        <button
                          className='btn btn--secondary ml-5'
                          disabled={stock[item.id] === 0}
                          onClick={() => handleAddToCart(item.id, item.name, item.price)}
                        >
                          +
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
      
            <div className='cart__footer'>
              <p className='cart__footer__title'>Cart Total: ${cart.total}</p>
              <button
                className='btn btn--primary'
                onClick={handleEmptyCart}
              >
                Empty cart
              </button>
            </div>
          </>
        )
      }

    </div>
  );
}

export default Cart;
