import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeItem, clearCart } from '../../store/cartSlice';
import { increaseStock } from '../../store/stockSlice';

import './Cart.scss';

import { Table, TableBody, TableCell, TableHead, TableRow }  from '@mui/material';




const Cart: React.FC = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const handleDecrement = (itemName: string) => {
    const itemInCart = cart.items.find(item => item.name === itemName);
    if (itemInCart && itemInCart.quantity > 0) {
      dispatch(removeItem(itemName));
      dispatch(increaseStock({ name: itemName, quantity: 1 }));
    }
  };

  const handleEmptyCart = () => {
    cart.items.forEach(item => {
      dispatch(increaseStock({ name: item.name, quantity: item.quantity }));
    });
    dispatch(clearCart());
    // if (closeDialog) closeDialog();
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
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {cart.items.map(item => (
                    <TableRow
                      key={item.name}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <button
                          className='btn btn--secondary'
                          onClick={() => handleDecrement(item.name)}
                        >
                          --
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
      
            <div className='cart__footer'>
              <p className='cart__footer__title'>Total: ${cart.total.toFixed(2)}</p>
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
