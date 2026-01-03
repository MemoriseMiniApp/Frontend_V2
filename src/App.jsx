import React, { useEffect, useState } from "react";
import { useRawInitData, init as initSDK } from "@telegram-apps/sdk-react";

const App = () => {
  const rawInitData = useRawInitData(); // получает initData (raw строку или объект)
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    initSDK(); // инициализируем Telegram Mini App SDK

    if (rawInitData) {
      setInitData(rawInitData);
      console.log("initData:", rawInitData);
    }
  }, [rawInitData]);

  if (!initData) return <div>Загрузка initData...</div>;

  return (
    <div>
      <h1>Привет, {initData.user?.firstName || initData.user?.first_name}!</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
    </div>
  );
};

export default App;
