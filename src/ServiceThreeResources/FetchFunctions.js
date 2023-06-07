export const ACTIONS = {
    GET_ACTIVITIES: 'get-activities',
    CREATE_ACTIVITY: 'create-activity',
    UPDATE_ACTIVITY: 'update-activity',
    DELETE_ACTIVITY: 'delete-activity'
  }

export const fetchFunction = function(action){
    switch (action.type) {
        case ACTIONS.GET_ACTIVITIES : getActivities(action);
        break;

        case ACTIONS.CREATE_ACTIVITY : createActivity(action);
        break;
      
        case ACTIONS.UPDATE_ACTIVITY : updateActivity(action);
        break;
       
        case ACTIONS.DELETE_ACTIVITY : deleteActivity(action);
        break;
            
        default: break;;
      }
}



const getActivities = function(action){
    fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities`)
    .catch((err)=> console.error(err))
    .then((response) => response.json())
    .then((data) => {
    action.dispatch(data);
  });
  }

  const createActivity = function(action){
    fetch('http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      })
        .then(response => response.json())
        .then(data => {
          console.log('POST request succeeded with JSON response:', data);
          action.dispatch({activities: [...action.itinerary.activities, data]})
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }


const updateActivity = function(action)
  {      const id = action.payload.id;
    fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log('PATCH request succeeded with JSON response:', data);
        const updatedActivities = action.itinerary.activities.filter(activity => activity.id !== id);
        updatedActivities.push(data)
        action.dispatch({activities: updatedActivities });
      })
      .catch(error => {
        console.error('Error:', error);
      });
}



const deleteActivity = function(action){
    const id = action.payload.id;
    fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/${id}`, {
      method: 'DELETE'
    })
      .then(data => {
        console.log('DELETE request succeeded with JSON response:', data);
        const updatedActivities = action.itinerary.activities.filter(activity => activity.id !== id);
        action.dispatch({activities: updatedActivities });
      })
      .catch(error => {
        console.error('Error:', error);
      });
}