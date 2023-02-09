import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import LoggingContext from "./LoggingContext";
import UserListContext from "./UserListContext";

const url = 'http://auth.galvanizelaboratory.com/api/admin/users'

const initialUsers = [];

const DisplayUsers = () => {
    const [authState,] = useContext(AuthContext);
    const [, userListDispatch] = useContext(UserListContext);
    const [, loggingDispatch] = useContext(LoggingContext);

    const [users, setUsers] = useState(initialUsers);

    const getUsers = useCallback(() => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        fetch(url, headers).then((response) => {
            const log = {
                type: response.ok ? 'success' : 'error',
                message: `${headers.method} ${url} - ${response.status}`
            }
            loggingDispatch({ type: 'log', payload: log })
            if(response.ok) {
                return response.json();
            } else {
                return {userSearchResults: initialUsers};
            }
        }).then((data) => {
            setUsers(data.userSearchResults);
            userListDispatch({type: 'setUserList', payload: data.userSearchResults})
        })
    }, [authState.token, userListDispatch])
    
    useEffect(() => {
        if(authState.username) {
            getUsers()
        } else {
            setUsers(initialUsers)
        }

    }, [authState, getUsers])

    return (
        <div className="DisplayUsers">
            <h1>Display Users</h1>
            { users.map((user, index) => {
                return (
                    <li key={index}> {user.username} - {user.firstName} {user.lastName} - {user.email}</li>)
            })}
        </div>
    )
}

export default DisplayUsers;