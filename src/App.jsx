import React, { useEffect, useState } from "react";
import { useRawInitData, init as initSDK } from "@telegram-apps/sdk-react";

const App = () => {
  const rawInitData = useRawInitData(); // получает initData (raw строку)
  const [initData, setInitData] = useState(null);
  const [authResponse, setAuthResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initSDK(); // инициализируем Telegram Mini App SDK

    if (rawInitData) {
      setInitData(rawInitData);
      console.log("initData:", rawInitData);

      // Отправляем initData на бэкенд для авторизации
      (async () => {
        try {
          const res = await fetch("https://95.81.99.97.nip.io/auth/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ init_data: rawInitData }),
            credentials: "include", // если используешь куки
          });

          if (!res.ok) {
            const err = await res.json();
            console.error("Telegram auth failed:", err);
            setAuthResponse({ error: err.detail || "Auth failed" });
          } else {
            const data = await res.json();
            setAuthResponse(data);
          }
        } catch (error) {
          console.error("Auth error:", error);
          setAuthResponse({ error: error.message });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [rawInitData]);

  if (!initData) return <div>Загрузка initData...</div>;
  if (loading) return <div>Авторизация Telegram...</div>;

  if (authResponse?.error) return <div>Ошибка авторизации: {authResponse.error}</div>;

  return (
    <div>
      <h1>Привет, {authResponse.user_data?.firstName || authResponse.user_data?.first_name}!</h1>
      <p>JWT токен: {authResponse.token}</p>
      <pre>{JSON.stringify(authResponse.user_data, null, 2)}</pre>
    </div>
  );
};

export default App;
