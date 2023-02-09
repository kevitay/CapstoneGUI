import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const url = 'http://auth.galvanizelaboratory.com/api/admin/users'

const initialUsers = [];

const DisplayUsers = () => {
    const [authState, authDispatch] = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [users, setUsers] = useState(initialUsers);

    const getUsers = () => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        setError('');
        setSuccess('');
        fetch(url, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                return response.json();
            } else {
                setError(`Failure: Response Code ${response.status}`);
                return {userSearchResults: initialUsers};
            }
        }).then((data) => {
            setUsers(data.userSearchResults);
        })
    }
    
    useEffect(() => {
        if(authState.username) {
            getUsers()
        } else {
            setUsers(initialUsers)
        }

    }, [authState])

    return (
        <div className="DisplayUsers">
            <h1>Display Users</h1>
            { users.map((user, index) => {
                return (
                    <li key={index}> {user.username} - {user.firstName} {user.lastName} - {user.email}</li>)
            })}

            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
        </div>
    )
}

export default DisplayUsers;