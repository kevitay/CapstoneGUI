import React, {useEffect, useState} from "react";

function ParticipantView (){

    const [requiredList, setRequiredList] = useState([]);

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData= () => {
        fetch()
        .then(response = response.json())
        .then(data => {
            setRequiredList(data);
        })
        .catch(error => {
            console.error('Error fetching required list: ', error);
        });
    };

    return (
        <div>
            
        </div>
    )

}
export default ParticipantView