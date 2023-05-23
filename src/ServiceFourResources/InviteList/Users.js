import React,  {useEffect, useState }  from "react";
import './InviteList.css';
import UserData from "./UserData"; 

function Users() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const [userState, setUser] = useState([]);
      const [loading, setLoadState] = useState(false);

      function getUsers(){
        setLoadState(true); 
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users", requestOptions)
        .then(response => response.json())
        .then(result => {
            setUser(result.users)
        })
        .then(result => console.log("result log", result))
        .then(setLoadState(false))
        .catch(error => console.log('error', error));
      }

      useEffect(() => {
        getUsers();
      },[]);

    return (
    <div className="Users">
        <form className="invite-form">
            <table className="user-data-table">
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Invite?</th>
                </tr>
                {
               loading ? "": userState.map((user) => (<UserData invitee={user}></UserData>))
            } </table>
            <input type="submit" value="Invite"></input>
        </form>
    </div>)
}

export default Users;
