import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { LoginProvider } from './services/LoginProvider.jsx';
import { init, backButton } from '@telegram-apps/sdk-react';

// Инициализируем SDK
try {
  init();
  // По желанию: сразу настраиваем базовые компоненты, например, кнопку "Назад"
  if (backButton.isSupported()) {
    backButton.mount();
  }
} catch (e) {
  console.error('Ошибка при инициализации Telegram SDK:', e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Важно: SDKProvider должен быть ВЫШЕ компонентов, 
       которые используют useInitData() 
    */}
    <LoginProvider>
      <App />
    </LoginProvider>
  </StrictMode>,
);