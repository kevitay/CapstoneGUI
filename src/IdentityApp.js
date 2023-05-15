import { useEffect, useReducer, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import AccountDetails from './AccountDetails';
import './App.css';
import AuthContext from './contexts/AuthContext';
import ChangePassword from './ChangePassword';
import DisplayRoles from './Roles/DisplayRoles';
import DisplayUsers from './DisplayUsers';
import EditUserRole from './Roles/EditUserRole';
import Login from './Login';
import Registration from './Registration';
import RoleListContext from './contexts/RoleListContext';
import UserListContext from './contexts/UserListContext';
import DisplayRole from './Roles/DisplayRole';
import Navigation from './Navigation';

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
      // make a copy
  const copyOfState = [...state];
  switch(action.type) {
    case 'setRoleList':
      return action.payload;
    case 'addRoleToList':
      // return the updated copy
      return copyOfState.concat(action.payload);
    case 'removeRole':
      // return the updated copy
      return copyOfState.filter((existingRole) => {
        if(existingRole.name === action.payload.name) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
}

const roleListInitialState = [];

const links = [
  { name: 'Login', path: '', component: <Login /> },
  { name: 'Details', path: 'accountDetails', component: <AccountDetails /> },
  { name: 'Roles', path: 'displayRoles', component: <DisplayRoles /> },
  { name: 'Users', path: 'displayUsers', component: <DisplayUsers /> },
  { name: 'Edit', path: 'editUserRole', component: <EditUserRole /> },
  { name: 'Password', path: 'changePassword', component: <ChangePassword /> },
  { name: 'Register', path: 'registration', component: <Registration /> },
]

function IdentityApp() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  const [userListState, userListDispatch] = useReducer(userListReducer, userListInitialState);
  const [roleListState, roleListDispatch] = useReducer(roleListReducer, roleListInitialState);
  const [user, setUser] = useState("");

  useEffect(() => {
    if(authState.username)
      setUser(`Logged in as ${authState.username}`)
    else {
      setUser("Logged out")
    }
  }, [authState])

  const logout = (e) => {
    authDispatch({type: 'saveAuth', payload: {username: '', token: ''}})
  }

  return (
    <div className="IdentityApp">
      <header>
        <h1>gLab Identity GUI</h1>
        <h2>{user}</h2>
        { authState.username ? <button onClick={logout}>logout</button> : ''}
      </header>
      <section>
        <AuthContext.Provider value={[authState, authDispatch]}>
          <UserListContext.Provider value={[userListState, userListDispatch]}>
          <RoleListContext.Provider value={[roleListState, roleListDispatch]}>
          <Navigation links={links} />
            <Routes>
              {links.map((link, index) => {
                return <Route key={index} path={link.path} element={link.component} />
              })}
              <Route path={'displayRoles/:roleName'} element={<DisplayRole />} />
            </Routes>
          </RoleListContext.Provider>
          </UserListContext.Provider>
        </AuthContext.Provider>
      </section>
    </div>
  );
}

export default IdentityApp;
