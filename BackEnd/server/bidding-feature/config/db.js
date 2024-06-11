const express = require('express')
const MongoDb = require('mongodb')
const Mongoose = require('mongoose')
const { MongoClient } = require('mongodb')


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

export const Connection = async () => {

     /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
     const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
 
     const client = new MongoClient(uri, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        maxPoolSize: 50,
        socketTimeoutMS: 30000
     }, (error , client))

     try {
        
       await client.connect(client)

       await listDatabases(client)
    
     } catch (error) {
        console.error(error.message)
     }
     finally {
        await client.close()
     }
}

