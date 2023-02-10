import { useReducer } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import AccountDetails from './AccountDetails';
import './App.css';
import AuthContext from './contexts/AuthContext';
import ChangePassword from './ChangePassword';
import DisplayRoles from './DisplayRoles';
import DisplayUsers from './DisplayUsers';
import EditUserRole from './EditUserRole';
import Login from './Login';
import Registration from './Registration';
import RoleListContext from './contexts/RoleListContext';
import UserListContext from './contexts/UserListContext';

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

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  const [userListState, userListDispatch] = useReducer(userListReducer, userListInitialState);
  const [roleListState, roleListDispatch] = useReducer(roleListReducer, roleListInitialState);

  return (
    <div className="App">
      <header>
        <h1>glab Identity GUI</h1>
      </header>
      <section>
        <AuthContext.Provider value={[authState, authDispatch]}>
          <UserListContext.Provider value={[userListState, userListDispatch]}>
          <RoleListContext.Provider value={[roleListState, roleListDispatch]}>
          <div>
          <nav>
            <ul>
              <li className="active"><Link to="/">Login</Link></li>
              <li><Link to="/accountDetails">Details</Link></li>
              <li><Link to="/displayRoles">Roles</Link></li>
              <li><Link to="/displayUsers">Users</Link></li>
              <li><Link to="/editUserRole">Edit</Link></li>
              <li><Link to="/change-password">Password</Link></li>
              <li><Link to="/registration">Register</Link></li>
            </ul>
          </nav>
          </div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/accountDetails" element={<AccountDetails />} />
              <Route path="/displayRoles" element={<DisplayRoles />} />
              <Route path="/displayUsers" element={<DisplayUsers />} />
              <Route path="/editUserRole" element={<EditUserRole />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </RoleListContext.Provider>
          </UserListContext.Provider>
        </AuthContext.Provider>
      </section>
    </div>
  );
}

export default App;
