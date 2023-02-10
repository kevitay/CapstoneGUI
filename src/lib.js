const url = 'http://auth.galvanizelaboratory.com/api'

const apiRequestWithToken = (method, resource, token, failedData, callback) => {
    const headers = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }
    const resourceUrl = `${url}/${resource}`
    fetch(resourceUrl, headers).then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            return failedData;
        }
    }).then(callback)
};

export { apiRequestWithToken }