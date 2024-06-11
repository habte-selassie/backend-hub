import sdk from '@api/coingate';

sdk.createOrder({
  shopper: '{"company_details":{"name":"string","code":"string","incorporation_date":"2024-05-22","incorporation_country":"string","address":"string","postal_code":"string","city":"string","country":"string"},"type":"aq","first_name":"aq","last_name":"aq","date_of_birth":"2024-05-22","nationality_country":"aq","residence_address":"aq","residence_postal_code":"aq","residence_city":"aq","residence_country":"Ethiopia"}',
  order_id: 'string',
  price_amount: 0,
  price_currency: 'string',
  receive_currency: 'string',
  title: 'string',
  description: 'string',
  callback_url: 'string',
  cancel_url: 'string',
  success_url: 'string',
  token: 'string',
  purchaser_email: 'habteselassie26@gmail.com'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
// //const sdk = require('coingate-v2')
// import sdk from 'coingate-v2'
// //const { client, testClient, Client, Config } = require('coingate-v2');
 
// //const coingate = client('your-token');
// //const testCongate = testClient('your-token');



 
// const createOrder =async()=>{
//     try {
//         const orderData = {
//             order_id: 'string',
//             price_amount: 0,
//             price_currency: 'string',
//             receive_currency: 'string',
//             title: 'string',
//             description: 'string',
//             callback_url: 'string',
//             cancel_url: 'string',
//             success_url: 'string',
//             token: 'string',
//             purchaser_email: 'string',
//             shopper: {
//               type: 'string',
//               first_name: 'string',
//               last_name: 'string',
//               date_of_birth: '2024-05-22',
//               nationality_country: 'string',
//               residence_address: 'string',
//               residence_postal_code: 'string',
//               residence_city: 'string',
//               residence_country: 'string',
//               company_details: {
//                 name: 'string',
//                 code: 'string',
//                 incorporation_date: '2024-05-22',
//                 incorporation_country: 'string',
//                 address: 'string',
//                 postal_code: 'string',
//                 city: 'string',
//                 country: 'string'
//               },
//             },

//         }
//         const response = await sdk.createOrder(orderData)
//         console.log(response)
//         return response
//     } catch (error) {
//         console.error('error creating order',error)
//         return error
//      }    
     
//    }

//    createOrder()