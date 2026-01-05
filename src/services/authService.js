// src/auth/authService.js
import { init as initSDK, useRawInitData } from "@telegram-apps/sdk-react";

let token = null;
let pendingTokenPromise = null;
let pendingInitDataPromise = null;

export const authService = {
  /**
   * Инициализируем SDK и получаем initData
   * Возвращает Promise<string>
   */
  async getInitData() {
    if (pendingInitDataPromise) return pendingInitDataPromise;
    pendingInitDataPromise = new Promise((resolve, reject) => {
      try {
        initSDK();

        const rawInitData = useRawInitData();
        if (rawInitData) {
          resolve(rawInitData);
        } else {
          // Если initData ещё не готов, пробуем чекать через setTimeout
          const interval = setInterval(() => {
            const data = useRawInitData();
            if (data) {
              clearInterval(interval);
              resolve(data);
            }
          }, 50);

          // таймаут через 5 сек
          setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Failed to get initData"));
          }, 5000);
        }
      } catch (err) {
        reject(err);
      }
    });

    return pendingInitDataPromise.finally(() => (pendingInitDataPromise = null));
  },

  /**
   * Получаем токен JWT
   * Если нет токена — получаем initData и логинимся
   */
  async getToken() {
    if (token) return token;
    if (pendingTokenPromise) return pendingTokenPromise;

    pendingTokenPromise = this.getInitData()
      .then(initData => this.loginWithTelegram(initData))
      .then(data => {
        token = data.token;
        pendingTokenPromise = null;
        return token;
      })
      .catch(err => {
        pendingTokenPromise = null;
        throw err;
      });

    return pendingTokenPromise;
  },

  /**
   * Отправляем initData на бекенд и получаем JWT
   */
  async loginWithTelegram(initData) {
    if (!initData) throw new Error("initData is required");

    const res = await fetch("https://95.81.99.97.nip.io/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ init_data: initData }),
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.detail || "Telegram auth failed");
    }

    return res.json(); // { token, user_data }
  },

  logout() {
    token = null;
  },
};
