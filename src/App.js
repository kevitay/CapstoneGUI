import { useReducer } from 'react';
import AccountDetails from './AccountDetails';
import './App.css';
import AuthContext from './AuthContext';
import ChangePassword from './ChangePassword';
import DisplayRoles from './DisplayRoles';
import DisplayUsers from './DisplayUsers';
import EditUserRole from './EditUserRole';
import Login from './Login';
import LoggingContext from './LoggingContext';
import Registration from './Registration';
import RoleListContext from './RoleListContext';
import UserListContext from './UserListContext';
import Log from './Log';

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

const roleListReducer = (state, action) => {
  switch(action.type) {
    case 'setRoleList':
      return action.payload.map((role) => {
        return role.name
      })
    default:
      return state;
  }
}

const roleListInitialState = [];

const loggingReducer = (state, action) => {
  switch(action.type) {
    case 'log':
      const copyOfState = [...state].concat(action.payload)
      return copyOfState;
    default:
      return state;
  }
}

const loggingInitialState = [];

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  const [userListState, userListDispatch] = useReducer(userListReducer, userListInitialState);
  const [roleListState, roleListDispatch] = useReducer(roleListReducer, roleListInitialState);
  const [loggingState, loggingDispatch] = useReducer(loggingReducer, loggingInitialState)

  return (
    <div className="App">
      <header>
        <h1>glab Identity GUI</h1>
      </header>
      <section>
        <AuthContext.Provider value={[authState, authDispatch]}>
          <LoggingContext.Provider value={[loggingState, loggingDispatch]}>
          <UserListContext.Provider value={[userListState, userListDispatch]}>
          <RoleListContext.Provider value={[roleListState, roleListDispatch]}>
            <Login></Login>
            <AccountDetails></AccountDetails>
            <DisplayRoles></DisplayRoles>
            <DisplayUsers></DisplayUsers>
            <EditUserRole></EditUserRole>
            <Registration></Registration>
            <ChangePassword></ChangePassword>
            <Log></Log>
          </RoleListContext.Provider>
          </UserListContext.Provider>
          </LoggingContext.Provider>
        </AuthContext.Provider>
      </section>
    </div>
  );
}

export default App;
