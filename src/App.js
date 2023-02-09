import { useReducer } from 'react';
import AccountDetails from './AccountDetails';
import './App.css';
import AuthContext from './AuthContext';
import ChangePassword from './ChangePassword';
import Login from './Login';
import Registration from './Registration';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'saveAuth':
      const copyOfState = { ...state }
      copyOfState.username = action.payload.username;
      copyOfState.token = action.payload.token;
      return copyOfState;
    default:
      return state;
  }
}

const authInitialState = {
  username: '',
  token: '',
}

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  return (
    <div className="App">
      <header>
        <h1>glab Identity GUI</h1>
      </header>
      <section>
        <AuthContext.Provider value={[authState, authDispatch]}>
          <Login></Login>
          <AccountDetails></AccountDetails>
          <Registration></Registration>
          <ChangePassword></ChangePassword>
        </AuthContext.Provider>
      </section>
    </div>
  );
}

export default App;
