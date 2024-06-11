const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 4001

app.use(cors())

const CMC_API_KEY = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'; // Use your own API key here

const fetchCatagories = async() => {
    try {
        const response = await axios.default.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories',{
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,

            },
            
        })
        return response.data.data;
    } catch (error) {
        
    }
}

const handleError = (error) => {
    if(error.response) {
    const status = error.response.status
    switch (status) {
        case 400:
        console.error('Bad Request: The server could not understand the request.');
        console.error(`Error Message: ${error.status.error_message}`)
        break;
      case 401:
        console.error('Unauthorized: API key is invalid.');
        break;
      case 403:
        console.error('Forbidden: You do not have access to this resoaurce.');
        break;
      case 429:
        console.error('Too Many Requests: You have hit the rate limit.');
        break;
      case 500:
        console.error('Internal Server Error: Something went wrong on the server.');
        break;
      default:
        console.error(`Error: ${error.message}`);     
      
        }a
    } else {
        console.error(`Error:${error.message}`)
    }

}