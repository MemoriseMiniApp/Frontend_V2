import './App.css';
import { useLogin } from './services/LoginProvider';

const App = () => {

  const { login } = useLogin();
  const jwt = login.jwt;

  const webApp = window.Telegram.WebApp;
  webApp.ready();

  const initData = webApp.initData;

  return (
    <div>
      <p>Hello, it`s Working, hmmm cool</p>
      <p>{ webApp.initData}</p>
      <p>{jwt}</p>
    </div>
  );
};

export default App;