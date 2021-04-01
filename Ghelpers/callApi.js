const axios = require('axios');


exports.callApi = (address, method = 'get', data = null, type) => {
    try {
        switch (method) {
            case 'get':
                return axios.get(address, {
                    headers: {}
                });

            case 'post':
                return axios.post(address, querystring.stringify({ ...data }), {
                    headers: {}
                });

            default:
                break;
        }
    } catch (e) {
        console.log('Check the error', e);
    }
};