import { useReducer } from 'react';
import AccountDetails from './AccountDetails';
import './App.css';
import AuthContext from './AuthContext';
import ChangePassword from './ChangePassword';
import DisplayRoles from './DisplayRoles';
import DisplayUsers from './DisplayUsers';
import EditUserRole from './EditUserRole';
import Login from './Login';
import Registration from './Registration';
import UserListContext from './UserListContext';

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

const userListReducer = (state, action) => {
  switch(action.type) {
    case 'setUserList':
      return action.payload.map((user) => {
        return user.username
      })
    default:
      return state;
  }
}

const userListInitialState = [];

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  const [userListState, userListDispatch] = useReducer(userListReducer, userListInitialState);

  return (
    <div className="App">
      <header>
        <h1>glab Identity GUI</h1>
      </header>
      <section>
        <AuthContext.Provider value={[authState, authDispatch]}>
          <UserListContext.Provider value={[userListState, userListDispatch]}>
            <Login></Login>
            <AccountDetails></AccountDetails>
            <DisplayRoles></DisplayRoles>
            <DisplayUsers></DisplayUsers>
            <EditUserRole></EditUserRole>
            <Registration></Registration>
            <ChangePassword></ChangePassword>
          </UserListContext.Provider>
        </AuthContext.Provider>
      </section>
    </div>
  );
}

export default App;
