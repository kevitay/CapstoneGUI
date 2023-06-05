import { ACTIONS } from "./Itinerary";

export const fetchFunction = function(action){
    switch (action.type) {
        case ACTIONS.GET_ACTIVITIES : getActivities(action);
        break;

        case ACTIONS.CREATE_ACTIVITY : createNewActivity(action);
        break;
      
        case ACTIONS.UPDATE_ACTIVITY :
       
        case ACTIONS.DELETE_ACTIVITY :
            
        default: break;;
      }
}



const getActivities = function(action){
    fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities`)
    .catch((err)=> console.error(err))
    .then((response) => response.json())
    .then((data) => {
    action.dispatch({type: ACTIONS.GET_ACTIVITIES, payload: data})
  });
  }

  const createNewActivity = function(action){
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
          action.dispatch({type: ACTIONS.CREATE_ACTIVITY, payload: {activities: []}})
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }