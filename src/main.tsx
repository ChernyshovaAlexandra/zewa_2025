import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { TelegramProvider } from './contexts/TelegramContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelegramProvider>
      <App />
    </TelegramProvider>
  </StrictMode>,
);
