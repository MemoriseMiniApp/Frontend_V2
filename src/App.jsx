import React, { useEffect, useState } from "react";
import { init, parseInitDataQuery } from "@telegram-apps/sdk";

const App = () => {
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    // Инициализация SDK — init() возвращает объект MiniApp
    const miniApp = init();

    miniApp.ready().then(() => {
      // parseInitDataQuery парсит initData из URL
      const parsed = parseInitDataQuery(window.location.search.replace("?", ""));
      console.log("Parsed initData:", parsed);

      setInitData(parsed);
    });
  }, []);

  if (!initData) return <div>Loading Telegram initData...</div>;

  return (
    <div>
      <h1>Hello, {initData.user?.first_name}!</h1>
      <p>Your Telegram ID: {initData.user?.id}</p>
    </div>
  );
};

export default App;
