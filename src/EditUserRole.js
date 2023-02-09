import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import UserListContext from "./UserListContext";

const url = 'http://auth.galvanizelaboratory.com/api/admin/users'

const initialUserDetailsState = {};

const EditUserRole = () => {
    const [authState,] = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [userListState, userListDispatch] = useContext(UserListContext);
    const [currentUser, setCurrentUser] = useState('');
    const [userDetails, setUserDetails] = useState(initialUserDetailsState)

    const selectUser = (e) => {
        setCurrentUser(e.target.value);
    }

    const getUser = useCallback(() => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        setError('');
        setSuccess('');
        fetch(`${url}/${currentUser}`, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                return response.json();
            } else {
                setError(`Failure: Response Code ${response.status}`);
                return initialUserDetailsState;
            }
        }).then((data) => {
            setUserDetails(data);
        })
    }, [authState.token, currentUser])

    useEffect(() => {
        if(currentUser) {
            getUser()
        }
    }, [currentUser, getUser])

    return (
        <div className="EditUserRole">
        <h1>Edit User Role</h1>
        <select name="currentEditUserRole" id="currentEditUserRole" onChange={selectUser}>
            <option value="">--Please choose an option--</option>
            {userListState.map((user, index) => {
                return <option value={user}>{user}</option>
            })}
        </select>

        <h2>{currentUser}</h2>
        <p>{JSON.stringify(userDetails)}</p>
        <h2 className="error">{error}</h2>
        <h2 className="success">{success}</h2>
        </div>
    )
}

export default EditUserRole;