import './App.css';
import { useLogin } from './services/LoginPrivider';

const App = () => {

  const { login } = useLogin();
  const jwt = login.jwt;


  return (
    <div>
      <p>Hello, it`s Working, hmmm cool</p>
      <p>{jwt}</p>
    </div>
  );
};

export default App;