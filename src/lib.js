const url = '//auth.galvanizelaboratory.com/api'

const apiRequestWithTokenWithData = (method, resource, token, data, failedData, callback) => {
    const requestHeaders = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }
    if(data) { requestHeaders.body = data; }
    const resourceUrl = `${url}/${resource}`
    fetch(resourceUrl, requestHeaders).then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            return failedData;
        }
    }).then(callback)
};

const apiRequestWithToken = (method, resource, token, failedData, callback) => {
    apiRequestWithTokenWithData(method, resource, token, undefined, failedData, callback)
};

const successMessage = "✅"
const failedMessage = "🔴"

export { apiRequestWithToken, apiRequestWithTokenWithData, successMessage, failedMessage, url }