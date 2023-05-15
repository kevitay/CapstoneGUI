import React from "react";
import { url } from "../IdentityResources/IdentityLib";

const HostContext = React.createContext({
    url: url,
});

export default HostContext;