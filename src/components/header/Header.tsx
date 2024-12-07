import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useTheme } from '../../context/ThemeContext';

import './Header.scss';

import Cart from '../cart/Cart';
import Timer from '../timer/Timer';

import { IconButton, Badge, Dialog, Switch, FormControlLabel, FormGroup } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';



const Header: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { theme, toggleTheme } = useTheme();



  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__logo'>
          <h1 className='header__logo-text'>FruitMart</h1>
        </div>
        
        <div className='header__actions'>
          <Timer />
          
          <IconButton
            sx={{ color: 'var(--text-color-white)' }} 
            className='header__actions-btn'
            aria-label='Open shopping basket'
            onClick={handleOpen}
          >
            <Badge badgeContent={cart.items.reduce((sum, item) => sum + item.quantity, 0)}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>


          <IconButton onClick={toggleTheme} className='header__actions-btn'>
            {theme === 'light' ? (
              <LightModeIcon/>
            ) : (
              <DarkModeIcon/>
            )}
          </IconButton>
         

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <Cart />
          </Dialog>
          
        </div>
      </div>
    </header>
  );
}

export default Header;