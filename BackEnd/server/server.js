const express = require('express');
const axios = require('axios');
const cors = require('cors');
//const sdk = require('coingate-v2')
const sdk = require('coingate-v2/src/client/api')
const sdk1 = require('coingate-v2/src/index')
const config = require('./config/config')
//const { client, testClient, Client, Config } = require('coingate-v2');
 
//const coingate = client('your-token');
//const testCongate = testClient('your-token');

//const fetch = require('node:f')
//const NewsApi = require('newsapi')
const NewsAPI = require('newsapi');
require('dotenv').config();



const app = express();
const port = 3001;

app.use(cors());

//const CMC_API_KEY = process.env.CMC_API_KEY; // Use your own API key here

const NewsApiKey = process.env.NEWS_API_KEY;

//const newsApi = new NewsApi(NewsApiKey)
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);


// const fetchCategories = async () => {
//   try {
//     const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories', {
//       headers: {
//         'X-CMC_PRO_API_KEY': CMC_API_KEY,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

// const fetchIDMap = async () => {
//   try {
//     const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
//       headers: {
//         'X-CMC_PRO_API_KEY': CMC_API_KEY,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

// const fetchQuotesLatest = async () => {
//   try {
//     const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//       headers: {
//         'X-CMC_PRO_API_KEY': CMC_API_KEY,
//       },
//       params: {
//         symbol: 'BTC',
//         convert: 'EUR',
//         aux: 'max_supply,circulating_supply,total_supply,market_cap_by_total_supply,volume_24h_reported,volume_7d,volume_7d_reported,volume_30d,volume_30d_reported'
//       }
//     });

//     if (response.status === 200) {
//       const responseData = response.data;
//       const bitcoinData = responseData.data[0]; // Access the first element in the data array
//       const name = bitcoinData.name;
//       const symbol = bitcoinData.symbol;
//       const slug = bitcoinData.slug;
//       const totalSupply = bitcoinData.total_supply;
//       const price = bitcoinData.quote.USD.price;
//       const volume24H = bitcoinData.quote.USD.volume_24h;
//       const marketCapital = bitcoinData.quote.USD.market_cap;
//       const priceInEuro = bitcoinData.quote.EUR.price;
//       const volChange = bitcoinData.quote.USD.volume_change_24h;
//       const percentChange1h = bitcoinData.quote.USD.percent_change_1h;
//       const percentChange24h = bitcoinData.quote.USD.percent_change_24h;
//       const percentChange7d = bitcoinData.quote.USD.percent_change_7d;
//       const percentChange30d = bitcoinData.quote.USD.percent_change_30d;

//       // Handle the retrieved data as needed
//       return {
//         name,
//         symbol,
//         slug,
//         totalSupply,
//         price,
//         volume24H,
//         marketCapital,
//         priceInEuro,
//         volChange,
//         percentChange1h,
//         percentChange24h,
//         percentChange7d,
//         percentChange30d
//       };
//     } else {
//       console.error('Error:', response.status, response.statusText);
//       return null;
//     }
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

//  const fetchGlobalMetrics = async () => {
//   try {
//     const response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
//       headers: {
//         'X-CMC_PRO_API_KEY': CMC_API_KEY,
//       },
//       params: {
        
//         convert: 'USD',
//       }
//     });

//     if (response.status === 200) {

//       const responseData = response.data;

//        // Log the entire response data to understand its structure
//        console.log('Response Data:', responseData);

      
//      // Access the nested properties correctly

//      const quote = responseData.data.quote['USD'];
//      const totalVolume24h = quote.total_volume_24h;

     
//      const TotalMarketCap = quote.total_market_cap;
//      const PreviousTotalMarketCap = quote.total_market_cap_yesterday;
//      const TotalMarketCapPercentageChange = ((TotalMarketCap - PreviousTotalMarketCap) / PreviousTotalMarketCap) * 100;

//      const TotalVolume24h = quote.total_volume_24h;
//      const PreviousTotalVolume24h = quote.total_volume_24h_yesterday;
//      const TotalVolume24hPercentageChange = ((TotalVolume24h - PreviousTotalVolume24h) / PreviousTotalVolume24h) * 100;


//       return {TotalMarketCapPercentageChange, TotalVolume24hPercentageChange,totalVolume24h,TotalMarketCap};
//     } else {
//       console.error('Error:', response.status, response.statusText);
//       return null;
//     }
//   } catch (error) {
//     if (error.response) {
//       console.error('Error Response Data:', error.response.data);
//     } else {
//       console.error('Error:', error.message);
//     }
//   }
// };

// // Example usage
// fetchGlobalMetrics().then(data => {
//   if (data) {
//     console.log('Total Market Cap Percentage Change:', data.TotalMarketCapPercentageChange);
//     console.log('Total Volume 24h Percentage Change:', data.TotalVolume24hPercentageChange);
//     console.log('a', data.totalVolume24h)
//     console.log('b',data.TotalMarketCap)
//   }
// });



// function aggregateData(data, interval) {
//   const totalMarketCap = data.total_market_cap;
//   const totalVolume24h = data.total_volume_24h;

//   console.log(totalMarketCap, totalVolume24h);

//   const aggregatedData = {};

//   let intervalInMinute = 0;
//   switch (interval) {
//     case '5m':
//       intervalInMinute = 5;
//       break;
//     case '10m':
//       intervalInMinute = 10;
//       break;
//     case '15m':
//       intervalInMinute = 15;
//       break;
//     case '30m':
//       intervalInMinute = 30;
//       break;
//     case '45m':
//       intervalInMinute = 45;
//       break;
//     case '1h':
//       intervalInMinute = 60;
//       break;
//     case '1d':
//       intervalInMinute = 1440;
//       break;
//     case '7d':
//       intervalInMinute = 10080;
//       break;
//     case '30d':
//       intervalInMinute = 43200;
//       break;
//     case '365d':
//       intervalInMinute = 525600;
//       break;
//     default:
//       console.error('Invalid interval option');
//       return null;
//   }

//   // if (Array.isArray(responseData.data)) { 
//   // // Iterate over the data and aggregate based on the specified interval
//   // responseData.data.forEach((entry) => {
//   //   const timestamp = new Date(entry.timestamp).getTime();
//   //   const intervalKey = Math.floor(timestamp / intervalInMinute) * intervalInMinute;

//   const currentDate = new Date();
//   const endDate = new Date('2024-05-18'); // End date set to May 18, 2024
//   const startDate = new Date(endDate);
//   startDate.setDate(endDate.getDate() - 30); // Start date set to 30 days before the end date


//   for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
//     const timestamp = date.getTime();
//     const intervalKey = Math.floor(timestamp / (intervalInMinute * 60 * 1000)) * (intervalInMinute * 60 * 1000);

//     if (totalMarketCap && totalVolume24h) {
//       if (!aggregatedData[intervalKey]) {
//         aggregatedData[intervalKey] = {
//           totalMarketCap: 0,
//           totalVolume24h: 0,
//           date: new Date(intervalKey),
//           count: 0,
//         };
//       }

//       aggregatedData[intervalKey].totalMarketCap += totalMarketCap;
//       aggregatedData[intervalKey].totalVolume24h += totalVolume24h;
//       aggregatedData[intervalKey].count++;
//     } else {
//       console.error('Invalid data for aggregation');
//     }
//   }

//   return aggregatedData;
// }


// // Fetch data function
// const CoinDataUpdatedEveryMinutes = async () => {
//   try {
//     const response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
//       headers: {
//         'X-CMC_PRO_API_KEY': CMC_API_KEY,
//       },
//       params: {
//         convert: 'USD',
//       },
//     });

//     if (response.status === 200) {
//       //const responseData = response.data;
//       const responseData = response.data.data.quote.USD;
//       const interval = '1d';
//       const aggregatedData = aggregateData(responseData, interval);
//       console.log(aggregatedData);
//       return aggregatedData;
//     } else {
//       console.error('No data');
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return null;
//   }
// }
        
//         CoinDataUpdatedEveryMinutes().then(result => {
//           if(result) {
//             console.log('Coin data updated based on Preference Time',result)
//           }
//         })
















// // // Latest Crypto News 
// const fetchLatestNews  = async(pageSize=10, page=1) => {
// // // To query /v2/top-headlines
// // // All options passed to topHeadlines are optional, but you need to include at least one of them
// try {
//   const response = await newsapi.v2.everything({
//     // sources: 'coingecko.com',
//     // sources : 'bbc-news',
//      q: 'bitcoin OR ethereum OR blockchain',
//      from : '2024-05-18',
//      sortBy : 'publishedAt',
//      //country: 'us',
//     //  category:'technology',
     
//     // pageSize : 10,
//     // q : 'bitcoin',
//     // category : 'technology',
//     // language: 'en',
//     // country: 'us',

//     headers : {
//       'X-Api-Key': '43d9e5cc8be74d01ac431427ce2559f3'
//     }
  
//   })

//   if(response) {
//     const newsList = response
//     console.log(newsList)
    
//     return newsList;
//   }
// } catch (error) {
//   // handleError()
//   console.log('Error Fetching the Content',error)
//   return null
//    }
// }

// // fetchLatestNews()

// const fetchMax50News = async() => {
//   const pageSize = 10;
//   const totalPages = 5;

//   let allNewsData = []

//   for (let page = 1; page < totalPages; page++) {
//      const NewsData = await fetchLatestNews(pageSize,page)
//      result =  allNewsData.concat(NewsData.articles)

//       if (result.length >= 10) {
//       result = result.slice(0, 10); // Limit the total articles to 50
//       break;
//     }
//   }
  
//   console.log('Total news articles:', result.length);
//   return result
// }

// fetchMax50News()





// // Latest Featured Articles
// const fetchLatestFeaturedArticles = async() => {
//    try {
//     const response = await newsapi.v2.topHeadlines({
//       // category:'crypto',
//       // language:'en',
//       // country:'de',
//       // q: 'bitcoin',
//        //q: 'bitcoin OR ethereum OR blockchain OR news',
//        from : '2024-05-12',
//        category: 'sports',
//        //sortBy : 'popularity',

//       // sources:'bbc-news'

//       headers : {
//          'X-Api-Key': '43d9e5cc8be74d01ac431427ce2559f3'
//       }
//     })

//     if (response) {
//       const articles = response
//       console.log(articles)
//       return articles

//     }
    
//    } catch (error) {
     
//     console.error('articles not found')
//     console.log('server error',error)
//     return null
//    }

// }

// fetchLatestFeaturedArticles()












// //Define your route to fetch data from NewsAPI
// app.get('/api/news/latest', async (req, res) => {
//   try {
//     const data = await fetchMax50News();
//     if (data) {
//       res.json(data);
//       console.log(data)
//     } else {
//       console.error('Not Getting The Api Data',);
//     }
    
   
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'An error occurred while fetching data' });
//   }
// });

// app.get('/api/latest/featured/articles', async (req, res) => {
//   try {
//     const data = await fetchLatestFeaturedArticles();
//     if (data) {
//       res.json(data);
//       console.log(data)
//     } else {
//       console.error('Not Getting The Api Data',);
//     }
    
   
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'An error occurred while fetching data' });
//   }
// });












 
const createOrder =async()=>{
    try {

      const url ='https://api-sandbox.coingate.com/v2/orders/'
      //  config.coingGateEnvironment === 'sandbox' 
      // ? 'https://api-sandbox.coingate.com/v2/orders/'
      // : 'https://api.coingate.com/v2/orders/';
  
      // "https://api.coingate.com/v2/orders/10568600/checkout" \
  
  
        const headers = {
          Authorization: `Token SAUyb62sBJG99f9xsRCPa6bv9-ZdPhx4sicNexW1`,
          'Content-Type': 'application/json',
        };
  
      const orderData = 
    
      {
        order_id: 1201,
        price_amount: 0.002,
        price_currency: 'BTC',
        receive_currency: 'BTC',
        title: 'Product title: Samsung Galaxy S21 Order ID: MyStore Order #98765 Cart ID: Cart #00112233  Product title: Nike Air Max 270  Order ID: ShopOnline Order #54321  Cart ID: Cart #00456789  Product title: Dell XPS 13 Laptop  Order ID: TechStore Order #67890  Cart ID: Cart #00223344  Product title: Sony WH-1000XM4  Order ID: AudioShop Order #11223  Cart ID: Cart #00334455',
        description: 'Details: 1 x Samsung Galaxy S21, 1 x Samsung Wireless Charger, 1 x Samsung Galaxy Buds Pro Details: 1 x Nike Air Max 270 (Size 10), 1 x Nike Dri-FIT T-Shirt (Size L), 1 x Nike Running Shorts (Size M) Details: 1 x Dell XPS 13 Laptop (i7, 16GB RAM, 512GB SSD), 1 x Dell USB-C Adapter, 1 x Dell Wireless Mouse Details: 1 x Sony WH-1000XM4 Headphones, 1 x Sony Portable Charger, 1 x Sony Carrying Case',
        callback_url: 'https://12345.ngrok.io/callback',
        cancel_url: 'https://12345.ngrok.io/cancel',
        success_url: 'https://12345.ngrok.io/success',
        token: 'yeifu74639hhlfl264847',
        purchaser_email: 'habteselassie26@gmail.com',
        shopper:        
          {
          type: 'business',
          first_name: 'Haba',
          last_name: 'Baba',
          date_of_birth: '2001-04-05',
          nationality_country: 'DE',
          residence_address: 'St Joseph Tito Street',
          residence_postal_code: '50672',
          residence_city: 'Cologne',
          residence_country: 'DE',
          company_details: {
            name: 'Celavice Chicker and Burger House',
            code: 'Celavice Chicker and Burger House',
            incorporation_date: '2009-01-01',
            incorporation_country: 'DE',
            address: 'St Joseph Tito Street',
            postal_code: '50672',
            city: 'Cologne',
            country: 'DE'
          }
        }
    }
    ;
        const response = await axios.post(url,orderData,{headers})
       // const orderId = response.data.order_id
        console.log('Order Created', response.data)
        const data = response.data
       // console.log(orderId)
        return data
    } catch (error) {
        console.error('Error creating CoinGate order:', error.response ? error.response.data : error.message)
        return null
     }    
     
   }

  //  createOrder()







  const checkOut = async(orderId) => {
    try {

      const order_id =1200
     // const functionCaller = createOrder()
    //   config.environment === 'sandbox'  // ? 'https://api-sandbox.coingate.com/v2/orders/10568600/checkout/' // : 'https://api.coingate.com/v2/orders/10568600/checkout/';
   const url =  `https://api-sandbox.coingate.com/v2/orders/${orderId}/checkout/`
  
   const checkOutData = {
      pay_currency: 'BTC',
      lightning_network: true,
      purchaser_email: 'habteselassie26@gmail.com',
      platform_id: 1,
      id: 1201
    }
    
    
    
     const headers = {
        'Authorization': `Token SAUyb62sBJG99f9xsRCPa6bv9-ZdPhx4sicNexW1`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'axios/1.6.8'
      }
    

    console.log('Checkout Request Payload',checkOutData)



const response = await axios.post(url, checkOutData , {headers});

   if(response.data && response.data.payment_url) {
    const payment_url = response.data.payment_url
    console.log('Payment Url',payment_url)
    return payment_url
   }
   else {
    console.error('Payment Url Not Found in Response')
   }
     
    } 
    catch (error) {
      console.error('Error creating Chekout Payment',{
        status: error.response,
        headers: error.response.headers,
        data: error.response.data,
      })
        // return error
    }  
  } 

  // Example usage
createOrder().then(order => {
  if (order && order.id) {
      console.log('Order ID:', order.id);  // Debug: log the order ID
      checkOut(order.id);
  } else {
      console.error('Order creation failed or order ID not retrieved');
  }
});


  const getOrder = async (id) => {

    try {
      

      const url =  `https://api-sandbox.coingate.com/v2/orders/${id}`

      const headers =   {
        'Authorization': `Token Y462nkPHrRs3kpdCnr-qfDVp5QMvVWTomTFgdgtv`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'axios/1.6.8'
      }
  
      const createOrderResponse = await createOrder()
      
      const { order_id } = createOrderResponse
       
     
      if(createOrderResponse && id === order_id && id === typeof Number ) {
       
        const response = await axios.get(url,{headers},order_id)
        console.log(response.data)
        console.log('order with specfic id exists')
        return response.data
      }
     
      else {
        console.log(`order id specfied by user doesnot exist`)
      }
  
    } catch (error) {
      console.error('Error Getting Specfic Id',{
        status: error.message,
        headers: error.response,
        data: error.response,
      })
    }
   
  }

// getOrder(1)


// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system
// also add subscription system

const getAllOrders = async()=> {

  const url =  `https://api-sandbox.coingate.com/v2/orders/`

  const headers =   {
    'Authorization': `Token Y462nkPHrRs3kpdCnr-qfDVp5QMvVWTomTFgdgtv`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'axios/1.6.8'
  }
  
const data= {
  per_page: '10',
  page: '4',
  sort: 'created_at_asc',
  'created_at[from]': '2024-05-22',
  'created_at[to]': '2024-05-24',
  status: 'new%20',
  'paid_at[from]': '2024-05-22',
  'paid_at[to]': '2024-05-24'
}

const response = await sdk.listOrders(url,data,{headers})

console.log(response)
return response;
  
}

// getAllOrders()










































































































// const handleError = (error) => {
//   if (error.response) {
//     const status = error.response.status;
//     switch (status) {
//       case 400:
//         console.error('Bad Request: The server could not understand the request.');
//         break;
//       case 401:
//         console.error('Unauthorized: API key is invalid')
//         console.error(`Error ${error.response.status}:${error.response.data.status.error_message}`);
//         break;
//       case 403:
//         console.error('Forbidden: You do not have access to this resource.');
//         break;
//       case 429:
//         console.error('Too Many Requests: You have hit the rate limit.');
//         break;
//       case 500:
//         console.error('Internal Server Error: Something went wrong on the server.');
//         break;
//       default:
//         console.error(`Error: ${error.message}`);
//     }
//   } else {
//     console.error(`Error: ${error.message}`);
//   }
// };

// app.get('/api/categories', async (req, res) => {
//   const categories = await fetchCategories();
//   if (categories) {
//     res.json(categories);
//   } else {
//     res.status(500).send('Error fetching categories');
//   }
// });

// app.get('/api/idmap', async (req, res) => {
//   const idMap = await fetchIDMap();
//   if (idMap) {
//     res.json(idMap);
//   } else {
//     res.status(500).send('Error fetching ID map');
//   }
// });

// app.get('/api/QuotesLatest',async (req,res) => {
//   const quotesLatest = await fetchQuotesLatest()
//   if(quotesLatest) {
//     res.json(quotesLatest)
//   }
//   else {
//     res.status(500).send('Error fetching quotesLatest')
//   }
// })

// app.get('/api/GlobalMetrics',async (req,res) => {
//   const globalMetrics = await fetchGlobalMetrics()
//   if(globalMetrics) {
//     res.json(globalMetrics)
//   }
//   else {
//     res.status(500).send('Error fetching globalMetrics')
//   }
// })

// // Route definition
// app.get('/api/CoinDataUpdatedEveryMinutes', async (req, res) => {
//   try {
//     const coinDataEveryMinute = await CoinDataUpdatedEveryMinutes();
//     if (coinDataEveryMinute) {
//       res.status(200).json(coinDataEveryMinute);
//     } else {
//       res.status(400).json({ error: 'No data' });
//     }
//   } catch (error) {
//     console.error('Error handling request:', error.message, error.stack);
//     res.status(500).json({ error: 'Error fetching coinDataEveryMinute', details: error.message });
//   }
// });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

























