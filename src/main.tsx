import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { TelegramProvider } from './contexts/TelegramContext';
import { initSentry } from './services/logger';

// Initialize Sentry (no-op if DSN or SDK is missing)
initSentry();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelegramProvider>
      <App />
    </TelegramProvider>
  </StrictMode>,
);
