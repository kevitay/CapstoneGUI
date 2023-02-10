import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import UserListContext from "./contexts/UserListContext";
import { apiRequestWithToken } from "./lib";

const initialUsers = [];

const DisplayUsers = () => {
    const [authState,] = useContext(AuthContext);
    const [, userListDispatch] = useContext(UserListContext);

    const [users, setUsers] = useState(initialUsers);

    const getUsers = useCallback(() => {
        apiRequestWithToken('GET', 'admin/users', authState.token, initialUsers, (data) => {
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