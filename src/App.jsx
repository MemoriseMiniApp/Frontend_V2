import { useEffect, useState } from 'react';
import { useLogin } from './services/LoginProvider';

const App = () => {
  const { login } = useLogin();
  const jwt = login?.jwt;

  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const webApp = window?.Telegram?.WebApp;
    if (!webApp) return;

    webApp.ready(); // уведомляем Telegram, что WebApp готов

    // initData может быть доступна сразу, но безопаснее дождаться onReady
    setInitData(webApp.initData);
  }, []);

  return (
    <div>
      <p>Hello, it`s Working, hmmm cool</p>
      <p>{window?.Telegram?.WebApp ?? "Init data not available"}</p>
      <p>{jwt ?? "JWT not available"}</p>
    </div>
  );
};

export default App;
