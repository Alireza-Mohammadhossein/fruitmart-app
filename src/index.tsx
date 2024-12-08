import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext'; 

import App from './App';
import store from './store/store';

import './styles/global.scss';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
);

