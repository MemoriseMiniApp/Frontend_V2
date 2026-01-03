import React, { useMemo } from 'react';
import { 
  SDKProvider, 
  useInitData, 
  useLaunchParams,
  DisplayGate
} from '@telegram-apps/sdk-react';

/**
 * Компонент для отображения данных пользователя.
 * Должен находиться внутри SDKProvider.
 */
function UserInfo() {
  // Получаем распарсенные данные инициализации
  const initData = useInitData();
  
  // Извлекаем объект пользователя
  const user = useMemo(() => initData?.user, [initData]);

  if (!user) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Данные пользователя не найдены. Запустите приложение через Telegram.
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Профиль пользователя</h1>
      <ul>
        <li><strong>User ID:</strong> {user.id}</li>
        <li><strong>Username:</strong> {user.username || 'не установлен'}</li>
        <li><strong>Имя:</strong> {user.firstName}</li>
        <li><strong>Язык:</strong> {user.languageCode}</li>
      </ul>
      
      <blockquote style={{ fontSize: '12px', color: '#666' }}>
        Подсказка: Для безопасности всегда проверяйте 
        <code>initDataRaw</code> на вашем бэкенде.
      </blockquote>
    </div>
  );
}

/**
 * Корневой компонент приложения
 */
export default function App() {
  return (
    // SDKProvider инициализирует окружение и предоставляет доступ к хукам
    <SDKProvider acceptCustomStyles debug>
      {/* DisplayGate помогает дождаться инициализации SDK */}
      <DisplayGate>
        <UserInfo />
      </DisplayGate>
    </SDKProvider>
  );
}