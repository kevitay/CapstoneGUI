import React from "react";
import { url } from "../lib";

const HostContext = React.createContext({
    url: url,
});

export default HostContext;