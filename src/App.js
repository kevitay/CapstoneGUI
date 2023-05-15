import React from "react";
import IdentityApp from "./IdentityApp";
import ServiceOneApp from "./ServiceOneResources/ServiceOneApp";
import ServiceTwoApp from "./ServiceTwoResources/ServiceTwoApp";
import ServiceThreeApp from "./ServiceThreeResources/ServiceThreeApp";
import ServiceFourApp from "./ServiceFourResources/ServiceFourApp";
import { NavLink, Route, Routes } from "react-router-dom";

function App() {
    
    return (
        <div className="App">
            <h1>App</h1>
            <nav>
                <ul>
                    <li>
                    <NavLink to={'/identity'}>Identity</NavLink>
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
                </ul>
            </nav>
            <Routes>
                <Route path={'/identity/*'} element={<IdentityApp />}></Route>
                <Route path={'/serviceOne/*'} element={<ServiceOneApp />}></Route>
                <Route path={'/serviceTwo/*'} element={<ServiceTwoApp />}></Route>
                <Route path={'/serviceThree/*'} element={<ServiceThreeApp />}></Route>
                <Route path={'/serviceFour/*'} element={<ServiceFourApp />}></Route>
            </Routes>
        </div>
    )
}

export default App;