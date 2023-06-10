import { useContext, useState } from "react";
import HostContext from "./Contexts/HostContext";
import { failedMessage, successMessage } from "./IdentityLib";
import { Box, Button, FormControl, InputLabel, Input, Card } from '@mui/material';


const initialRegistrationState = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '', 
    state: '', 
    phoneNumber: '',
}

const Registration = () => {
    const [registration, setRegistration] = useState(initialRegistrationState)
    const host = useContext(HostContext);
    const [message, setMessage] = useState('');

    const processRegistration = (e) => {
        e.preventDefault();
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration),
        }
        fetch(`${host.url}/account/register`, headers).then((response) => {
            if(response.ok) {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registration),
                }
                console.log(registration)
                fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users", requestOptions).then((response) => {
                    if(response.ok) {
                        setMessage(successMessage);
                        window.location.href = '/';
                    } else {
                        setMessage(failedMessage); 
                    }})
            } else {
                setMessage(failedMessage);
            }
        })
    }

    const inputUpdate = (e) => {
        setRegistration({
            ...registration,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="Registration">
            <Card
            sx={{
                width:500,
                fontSize: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                margin: 'auto', 
                boxShadow:15,
                marginTop: '20px',
                }}>
            <h1>Create your profile</h1>
          <form onSubmit={processRegistration}>
            {Object.keys(registration).map((key) => {
              const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
              const isRequired = key !== 'phoneNumber';
      
              return (
                <Box 
                sx={{
                    marginTop: 4,
                  }}
                key={key} marginTop={2} marginBottom={1}>
                  <FormControl required={isRequired}>
                    <InputLabel htmlFor={`registration_${key}`}>{label}</InputLabel>
                    <Input sx={{width:250}}
                      type={key !== 'password' ? 'text' : 'password'}
                      id={`registration_${key}`}
                      name={key}
                      value={registration[key]}
                      onChange={inputUpdate}
                    />
                  </FormControl>
                </Box>
              );
            })}
            <Box  
            sx={{
                    marginTop: 3.5,
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
            <Button type="submit" variant="contained">Register</Button>
              <span>{message}</span>
            </Box>
          </form>
          </Card>
        </div>
      );
}

export default Registration;