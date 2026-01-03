import React, { useEffect, useState } from "react";
import { init, retrieveLaunchParams } from "@telegram-apps/sdk";

export default function App() {
  const [launchParams, setLaunchParams] = useState(null);

  useEffect(() => {
    // Инициализация SDK
    init();

    // Получаем параметры запуска
    const lp = retrieveLaunchParams();
    console.log("launchParams:", lp);

    setLaunchParams(lp);
  }, []);

  if (!launchParams) return <div>Loading initData...</div>;

  return (
    <div>
      <h1>Hello, {launchParams.user?.first_name || "User"}!</h1>
      <pre>{JSON.stringify(launchParams, null, 2)}</pre>
    </div>
  );
}
