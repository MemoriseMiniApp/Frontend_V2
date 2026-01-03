import { useEffect, useState } from 'react';
import { useLogin } from './services/LoginProvider';

import { initMiniApp, retrieveLaunchParams } from '@tma.js/sdk';


const App = () => {
  const { login } = useLogin();
  const jwt = login?.jwt;

  const [user, setUser] = useState(null); // Состояние для хранения info о пользователе


  useEffect(() => {
    const [miniApp] = initMiniApp();

    miniApp.ready().then(() => {
      const { initDataRaw, initData } = retrieveLaunchParams();

      console.log('Raw initData:', initDataRaw);
      console.log('Parsed initData obj:', initData);
    });
  }, []);

  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const webApp = window?.Telegram?.WebApp;
    if (!webApp) return;

    webApp.ready(); // уведомляем Telegram, что WebApp готов

    // initData может быть доступна сразу, но безопаснее дождаться onReady
    setInitData(webApp.initData);
  }, []);

    if (!user) return <div>Загрузка данных Telegram...</div>;


  return (
    <div>
      <h1>Привет, {user.first_name}!</h1>
      <p>Твой Telegram ID: {user.id}</p>
    </div>
  );
};

export default App;
