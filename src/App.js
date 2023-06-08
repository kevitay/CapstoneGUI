import React from 'react';
import IdentityApp from './IdentityResources/IdentityApp';
import Event from './ServiceOneResources/Event';
import ServiceTwoApp from './ServiceTwoResources/ServiceTwoApp';
import ServiceThreeApp from './ServiceThreeResources/ServiceThreeApp';
import ServiceFourApp from './ServiceFourResources/ServiceFourApp';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreateEventFlow from './ServiceOneResources/CreateEventFlow';
import EventImages from "./ServiceFourResources/EventImages/EventImages";
import { EventProvider } from './ServiceOneResources/EventsContext';
import EventList from './ServiceOneResources/EventList';
import EditEvent from './ServiceOneResources/EditEvent';
import AuthContext from './IdentityResources/Contexts/AuthContext';
import { useReducer } from 'react';
import Header from './Header';
import { ColorModeProvider } from './ModeContext';
import MyEvents from './ServiceFourResources/MyEvents/MyEvents';

const authInitialState = {
  username: '',
  token: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'saveAuth':
      const copyOfState = { ...state };
      copyOfState.username = action.payload.username;
      copyOfState.token = action.payload.token;
      return copyOfState;
    default:
      return state;
  }
};

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <div className="App">
      <AuthContext.Provider value={[authState, authDispatch]}>
      <ColorModeProvider>
      <Header/>
      <nav>
        <ul>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/serviceOne'}>Service One</NavLink>
          </li>
          <li>
            <NavLink to={'/serviceTwo'}>Service Two</NavLink>
          </li>
          <li>
            <NavLink to={'/serviceThree'}>Service Three</NavLink>
          </li>
          <li>
            <NavLink to={'/serviceFour'}>Service Four</NavLink>
          </li>
          <li>
            <NavLink to={'/identity'}>Identity</NavLink>
          </li>
        </ul>
      </nav>
        <EventProvider>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/serviceOne/*'} element={<EventList />}></Route>
            <Route path={'/serviceOne/event/:id'} element={<Event />}></Route>
            <Route path={'/serviceOne/editEvent/:id'} element={<EditEvent />}></Route>
            <Route path={'/serviceOne/createEventFlow'} element={<CreateEventFlow />}></Route>
            <Route path={'/serviceTwo/*'} element={<ServiceTwoApp />}></Route>
            <Route path={'/serviceThree/*'} element={<ServiceThreeApp />}></Route>
            <Route path={'/serviceFour/*'} element={<ServiceFourApp />}></Route>
              <Route path={'/myEvents/'} element={<MyEvents />}></Route>
             <Route path={'/eventImages/:eventId'} element={<EventImages />}></Route>
            <Route path={'/identity/*'} element={<IdentityApp />}></Route>
          </Routes>
        </EventProvider>
        </ColorModeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;