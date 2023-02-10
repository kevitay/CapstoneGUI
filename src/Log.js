import { useContext } from "react";
import LoggingContext from "./contexts/LoggingContext";

const Log = () => {
    const [loggingState, ] = useContext(LoggingContext);

    return (
        <div className="Log">
            {loggingState.map((logEntry, index) => {
                return <p key={index} className={logEntry.type}>{logEntry.message}</p>
            })}
        </div>
    )
}

export default Log;