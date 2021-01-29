import UserProvider from "./providers/UserProvider"
import Application from './Application'
import './App.css';

function App() {
  return (
  <div className="App">
    <UserProvider>
      <Application/>
    </UserProvider>
  </div>
  );
}

export default App;
