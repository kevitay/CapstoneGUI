// Data we need:
// checkList for the eventId currently being used
// assigneeList for each item in the checkList
// userName of the current user

const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";

const getChecklistByEventId = (eventId) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return fetch(checklistUrl + "/" + eventId, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
};

const getAssigneeListForItem = (itemId) => {
  return fetch(checklistUrl + "/assignees/" + itemId, { method: 'GET' })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return {};
      }
    })
    .catch(error => console.log('error', error))
};

const getAssigneeListsForItems = (items) => {
  return Promise.all(items.map(item => getAssigneeListForItem(item.id)));
}

export const getListData = (eventId, userName) => {
  const data = {
    packingList: [],
    currentUserSignups: [],
    availableSignups: []
  };

  return getChecklistByEventId(eventId)
    .then(({ checklist }) => {
      data.packingList = checklist.filter(item => item.type === "packing list");
      data.availableSignups = checklist.filter(item => item.type === "signup list");
      return getAssigneeListsForItems(data.availableSignups);
    })
    .then(assigneeLists => {
      return assigneeLists.reduce((assignedCounts, list) => {
        if (list.assigneeList) {
          for (const item of list.assigneeList) {
            if (!assignedCounts[item.checklistItem.id]) {
              assignedCounts[item.checklistItem.id] = {
                taken: 1,
                assigned: 0
              };
            } else {
              assignedCounts[item.checklistItem.id].taken++;
            }

            if (item.userName === userName) {
              assignedCounts[item.checklistItem.id].assigned++;
            }
          }
        }

        return assignedCounts;
      }, {});
    })
    .then(assignedCounts => {
      console.log("assignedCounts", assignedCounts);
      const availableSignups = [...data.availableSignups];
      data.availableSignups = [];

      for (const signup of availableSignups) {
        if (assignedCounts.hasOwnProperty(signup.id) && assignedCounts[signup.id].assigned) {
          const assigned = { ...signup };
          assigned.quantity = assignedCounts[signup.id].assigned;
          data.currentUserSignups.push(assigned);
        }

        const notAssigned = { ...signup };
        notAssigned.quantity = signup.quantity - (assignedCounts[signup.id] ? assignedCounts[signup.id].taken : 0);
        if (notAssigned.quantity > 0) {
          data.availableSignups.push(notAssigned);
        }
      }

      return data;
    });
}

export const signupForItem = (itemId, userName) => {
  const newAssigneeJson = {
    checklistItem: { id: itemId },
    userName: userName
  };

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newAssigneeJson),
    redirect: "follow"
  };

  return fetch(checklistUrl + "/assignees", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => console.log('error', error));

}