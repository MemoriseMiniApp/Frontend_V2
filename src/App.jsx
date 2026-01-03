import './App.css';
import { useLogin } from './services/LoginProvider';

const App = () => {
  const { login } = useLogin();
  const jwt = login?.jwt; // безопасно, если login undefined

  const webApp = window?.Telegram?.WebApp;
  webApp?.ready(); // вызываем только если webApp существует

  const initData = webApp?.initData; // безопасно, если webApp undefined

  return (
    <div>
      <p>Hello, it`s Working, hmmm cool</p>
      <p>{initData ?? "Init data not available"}</p> {/* fallback текст если undefined */}
      <p>{jwt ?? "JWT not available"}</p> {/* fallback текст если undefined */}
    </div>
  );
};

export default App;
