import React from "react";
import IdentityApp from "./IdentityResources/IdentityApp";
import Event from "./ServiceOneResources/Event";
import EventList from "./ServiceOneResources/EventList";
import ServiceTwoApp from "./ServiceTwoResources/ServiceTwoApp";
import ServiceThreeApp from "./ServiceThreeResources/ServiceThreeApp";
import ServiceFourApp from "./ServiceFourResources/ServiceFourApp";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
    
    return (
        <div className="App">
            <h1>App</h1>
            <nav>
                <ul>
                    <li>
                    <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li>
                    <NavLink to={'/serviceOne'}>Event</NavLink>
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
            <EventList/>
            <Routes>
                <Route path={'/'} element={<Home />}></Route>
                <Route path={'/serviceOne/*'} element={<Event />}></Route>
                <Route path={'/serviceTwo/*'} element={<ServiceTwoApp />}></Route>
                <Route path={'/serviceThree/*'} element={<ServiceThreeApp />}></Route>
                <Route path={'/serviceFour/*'} element={<ServiceFourApp />}></Route>
                <Route path={'/identity/*'} element={<IdentityApp />}></Route>
            </Routes>
        </div>
    )
}

export default App;