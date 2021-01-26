import UserProvider from "./providers/UserProvider"
import Application from './Application'
import './App.css';

function App() {
  return (
    <UserProvider>
      <Application/>
    </UserProvider>
  );
}

export default App;
