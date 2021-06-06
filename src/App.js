import {UserProvider} from "./UserContext"

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
