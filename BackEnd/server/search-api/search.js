const { Client, errors } = require('@elastic/elasticsearch')
const { Events } = require('@elastic/elasticsearch')
const AbortController = require('node-abort-controller')
const { TimeoutError, ElasticsearchClientError, ConnectionError,
  RequestAbortedError ,
  NoLivingConnectionsError ,
  SerializationError,
  DeserializationError,
  ResponseError,
  ConfigurationError } = require('@elastic/elasticsearch')
  const fs = require('fs')

//   Elasticsearch endpoint:
// https://7c7c36a8972648f1b473f120301e1b75.us-central1.gcp.cloud.es.io:443

// Cloud ID:
// a453920abb24407186ae5fcdbc3380d9:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDdjN2MzNmE4OTcyNjQ4ZjFiNDczZjEyMDMwMWUxYjc1JDNlMTlhZTY2NmE3MzQyNTNhYWI2MGE1YjYzZTQxYmUz

///////////////// ORIGINL QUERY
// The query should consider various factors to provide relevant results, including exact matches, partial matches, and related terms. 
//We can achieve this using a combination of multi_match, match_phrase, and possibly other filters or boosts.
//const client = new Client({ node: 'http://localhost:9200' });


// Configure Elasticsearch Client
const client = new Client({
  node: 'https://your-cloud-endpoint', // Elasticsearch cloud endpoint
  cloud: { id: 'your-cloud-id' },
  auth: {
    apiKey: 'base64EncodedKey' // Replace with your API key
    // OR use username and password
    // username: 'elastic',
    // password: 'changeme'
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
  node: {
    url: new URL('http://localhost:9200'),
    tls: { rejectUnauthorized: false }, // Example TLS option
    agent: { keepAlive: true }, // Example HTTP agent option
    id: 'custom-node-id',
    headers: { 'custom': 'headers' },
    roles: {
      master: true,
      data: true,
      ingest: true,
      ml: false
    }
  }
});

const reelsMapping = {
  dynamic: true, // Enable dynamic mapping
  properties: {
    id: { type: 'keyword' },
    user_id: { type: 'keyword' },
    username: { type: 'keyword' },
    timestamp: { type: 'date' },
    duration: { type: 'integer' },
    views: { type: 'integer' },
    likes: { type: 'integer' },
    comments: { type: 'integer' },
    shares: { type: 'integer' },
    caption: { type: 'text', analyzer: 'standard' },
    location: {
      properties: {
        name: { type: 'text', analyzer: 'standard' },
        latitude: { type: 'float' },
        longitude: { type: 'float' },
        city: { type: 'text', analyzer: 'standard' },
        country: { type: 'text', analyzer: 'standard' }
      }
    },
    hashtags: { type: 'keyword' },
    media: {
      properties: {
        type: { type: 'keyword' },
        url: { type: 'text', index: false }, // Don't index media URLs
        thumbnail: { type: 'text', index: false }
      }
    }
  }
};


// 2. Implement the Index
// 3.1 Create the Index

async function createReelsIndex() {
  try {
    const response = await axios.put(`${elasticsearchUrl}/reels_index`, { mappings: reelsMapping });
    console.log('Index created successfully:', response.data);
  } catch (error) {
    console.error('Error creating index:', error.response.data);
  }
}



//////////// step 2 create custom analyzers, implement synonym handling, and enable fuzzy matching

// Custom Analyzer Configuration
//Create custom analyzers that include tokenizers and filters to handle various languages, synonyms, stop words, and stemming.

const indexSettingAndMappings = {
  "settings": {
    "analysis": {
      "filter": {
        "synonym_filter": {
          "type": "synonym",
          "synonyms_path": "my_synonym.txt",
          "updateable": true,
          "synonyms": [
            "movie, film",
            "picture, photo, image",
            "happy, joyful, elated"
          ]
        },
        "english_stop": {
          "type": "stop",
          "stopwords": "_english_"
        },
        "english_stemmer": {
          "type": "stemmer",
          "language": "english"
        },
        "spanish_stop": {
          "type": "stop",
          "stopwords": "_spanish_"
        },
        "spanish_stemmer": {
          "type": "stemmer",
          "language": "light_spanish"
        },
        "shingle": {  // Add shingle filter
          "type": "shingle",
          "min_shingle_size": 2,
          "max_shingle_size": 3
        }
      },
      "analyzer": {
        "custom_reels_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "synonym_filter",
            "english_stop",
            "spanish_stop",
            "english_stemmer",
            "spanish_stemmer",
            "shingle" // Include shingle filter in the analyzer
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "user_id": { "type": "keyword" },
      "username": { "type": "keyword" },
      "timestamp": { "type": "date" },
      "duration": { "type": "integer" },
      "views": { "type": "integer" },
      "likes": { "type": "integer" },
      "comments": { "type": "integer" },
      "shares": { "type": "integer" },
      "caption": { "type": "text", "analyzer": "custom_reels_analyzer" },
      "location": {
        "properties": {
          "name": { "type": "text", "analyzer": "custom_reels_analyzer" },
          "latitude": { "type": "float" },
          "longitude": { "type": "float" },
          "city": { "type": "text", "analyzer": "custom_reels_analyzer" },
          "country": { "type": "text", "analyzer": "custom_reels_analyzer" }
        }
      },
      "hashtags": { "type": "keyword" },
      "media": {
        "properties": {
          "type": { "type": "keyword" },
          "url": { "type": "text", "index": false },
          "thumbnail": { "type": "text", "index": false }
        }
      }
    }
  }
};

(async () => {
  try {
    await client.indices.create({
      index: 'myapp',
      body: indexSettingAndMappings // Pass the index settings and mappings JSON here
    });
  } catch (error) {
    console.error("Error creating index:", error);
  }
})();

  

async function createReelsIndex() {
  try {
    const response = await axios.put(`${elasticsearchUrl}/reels_index`, indexSettingAndMappings);
    console.log('Index created successfully:', response.data);
  } catch (error) {
    console.error('Error creating index:', error.response.data);
  }
}

// Call the function to create the index
createReelsIndex();

// read the jjson file containing the articles
const rawData = fs.readFileSync('data.json')
const articlesData = JSON.parse(rawData)


// Assuming each article is in an array named "articles" in the JSON file
const articles = articlesData.articles;

// Iterate over each article and insert it into Elasticsearch
for (const article of articles) {
    await client.index({
      index: 'myapp',
      body: {
    title: article.title,
    content: article.content,
    author: article.author,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt
  },
  refresh: true
    })
}


// Inserting the article data into Elasticsearch
await client.index({
  index: 'myapp',
  body: {
    title: article.title,
    content: article.content,
    author: article.author,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt
  },
  refresh: true
});





const searchQuery = async() => {
  try {
    const responseData = await client.search({
      index: 'myapp',
      body: {
          "query": {
            "bool": {
              "must": [
                {
                  "multi_match": {
                    "query": "a",
                    "fields": [
                      "caption^3",
                      "user_name^3",
                      "hashtags^3",
                      "media.url^3"
                    ],
                    "type": "best_fields",
                    "fuzziness": "auto",
                    "operator": "OR"
                  }
                },
                [
                        {
                          "match_phrase": {
                            "id": {
                              "query": "2793204882023",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "user_id": {
                              "query": "732904904",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "username": {
                              "query": "haba1819",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "timestamp": {
                              "query": "2024-02-10",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "duration": {
                              "query": "4 hour 3 minutes",
                              "slop": 2
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "views": {
                              "query": "100",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "likes": {
                              "query": "10",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "comments": {
                              "query": "19",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "shares": {
                              "query": "7",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "caption": {
                              "query": "exploring Tokyo",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "location.name": {
                              "query": "Nagasaki Mountain",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "location.latitude": {
                              "query": "40.753",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "location.longitude": {
                              "query": "-73.983",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "location.city": {
                              "query": "Tokyo",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "location.country": {
                              "query": "Japan",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "hashtags": {
                              "query": "[\"adventure\", \"mountain\"]",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "media.type": {
                              "query": "Video",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "media.url": {
                              "query": "https://example.com/reel.mp4",
                              "slop": 0
                            }
                          }
                        },
                        {
                          "match_phrase": {
                            "media.thumbnail": {
                              "query": "https://example.com/reel_thumbnail.jpg",
                              "slop": 0
                            }
                          }
                        }
                      ]
                    
                  
                ]
              ,
              "should": [
                {
                  "multi_match": {
                    "query": "a",
                    "fields": [
                      "location.name^3",
                      "id^3",
                      "location.city^3",
                      "location.country^3",
                      "location.latitude^3",
                      "location.longitude^3",
                      "media.thumbnail^3"
                    ],
                    "type": "best_fields",
                    "fuzziness": "auto",
                    "operator": "OR"
                  }
                },
                {
                  "wildcard": {
                    "id": "2793204882023*"
                  }
                },
                {
                  "wildcard": {
                    "user_id": "732904904*"
                  }
                },
                {
                  "wildcard": {
                    "username": "haba1819*"
                  }
                },
                {
                  "wildcard": {
                    "timestamp": "2024-02-10*"
                  }
                },
                {
                  "wildcard": {
                    "duration": "4 hour 3 minutes*"
                  }
                },
                {
                  "wildcard": {
                    "views": "100*"
                  }
                },
                {
                  "wildcard": {
                    "likes": "10*"
                  }
                },
                {
                  "wildcard": {
                    "comments": "19*"
                  }
                },
                {
                  "wildcard": {
                    "shares": "7*"
                  }
                },
                {
                  "wildcard": {
                    "caption": "exploring Tokyo*"
                  }
                },
                {
                  "wildcard": {
                    "location.name": "Nagasaki Mountain*"
                  }
                },
                {
                  "wildcard": {
                    "location.latitude": "40.753*"
                  }
                },
                {
                  "wildcard": {
                    "location.longitude": "-73.983*"
                  }
                },
                {
                  "wildcard": {
                    "location.city": "Tokyo*"
                  }
                },
                {
                  "wildcard": {
                    "location.country": "Japan*"
                  }
                },
                {
                  "wildcard": {
                    "hashtags": "*adventure*"
                  }
                },
                {
                  "wildcard": {
                    "media.type": "Video*"
                  }
                },
                {
                  "wildcard": {
                    "media.url": "https://example.com/reel.mp4*"
                  }
                },
                {
                  "wildcard": {
                    "media.thumbnail": "https://example.com/reel_thumbnail.jpg*"
                  }
                }
              ],
              "must_not": [
                {
                  "multi_match": {
                    "query": "a",
                    "fields": [
                      "shares^3",
                      "views^3"
                    ],
                    "type": "best_fields",
                    "fuzziness": "auto",
                    "operator": "OR"
                  }
                }
              ],
              "filter": [
                {
                  "multi_match": {
                    "query": "a",
                    "fields": [
                      "likes^3",
                      "comments^3",
                      "views^3"
                    ],
                    "type": "best_fields",
                    "fuzziness": "auto",
                    "operator": "OR"
                  }
                }
              ]
            }
          },
          "suggestions": {
            "suggest": {
              "text": "user_input_here",
              "user_id_suggestions": {
                "prefix": "user_input_here",
                "completion": {
                  "field": "user_id_suggest",
                  "size": 10
                }
              },
              "username_suggestions": {
                "prefix": "user_input_here",
                "completion": {
                  "field": "username_suggest",
                  "size": 10
                }
              },
              "caption_suggestions": {
                "prefix": "user_input_here",
                "completion": {
                  "field": "caption_suggest",
                  "size": 10
                }
              },
              "location_name_suggestions": {
                "prefix": "user_input_here",
                "completion": {
                  "field": "location_name_suggest",
                  "size": 10
                }
              },
              "hashtags_suggestions": {
                "prefix": "user_input_here",
                "completion": {
                  "field": "hashtags_suggest",
                  "size": 10
                }
              }
            },
          }, "highlight": {
            "fields": {
              "id": {},
              "user_id": {},
              "username": {},
              "timestamp": {},
              "duration": {},
              "views": {},
              "likes": {},
              "comments": {},
              "shares": {},
              "caption": {},
              "location.name": {},
              "location.latitude": {},
              "location.longitude": {},
              "location.city": {},
              "location.country": {},
              "hashtags": {},
              "media.type": {},
              "media.url": {},
              "media.thumbnail": {}
            }
          }
        }
    },{
      ignore: [404], // Array of status codes to ignore
      requestTimeout: 1000000, // Number for max request timeout in milliseconds
      maxRetries: 3, // Number for max retries
      compression: false, // Boolean for compression
      asStream: true, // Boolean to get raw Node.js stream of data
      headers: { 'Custom-Header': 'value' }, // Object for custom headers
      querystring: { param1: 'value1' }, // Object for custom querystring
      id: 'custom-request-id', // Custom request ID
      context: { user: 'example-user' }, // Custom object per request
      maxResponseSize: 10485760, // Number for max response size in bytes (10 MB in this example)
      maxCompressedResponseSize: 5242880, // Number for max compressed response size in bytes (5 MB in this example)
      signal: new AbortController().signal // AbortSignal instance for request abortion
    })
    console.log(JSON.stringify(response.body, null, 2));
}

   catch (error) {
    searchErrorHandler()
    console.error(error);
  }
}

searchQuery()


function searchErrorHandler(error) {
  try {
    switch (true) {
      case error instanceof ElasticsearchClientError:
        console.error('Elastic Search Client Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;

      case error instanceof TimeoutError:
        console.error('TimeOut Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      case error instanceof ConnectionError:
        console.error('Connection Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      case error instanceof RequestAbortedError:
        console.error('Request Aborted Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      case error instanceof NoLivingConnectionsError:
        console.error('No Living Connections Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      case error instanceof SerializationError:
        console.error('Serialization Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      case error instanceof DeserializationError:
        console.error('DeSeralization Error', error.message);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      case error instanceof ResponseError:
        console.error('Response Error', error.message);
        console.error('Body', error.body);
        console.error(`Error happens with status code of ${error.statusCode}`);
        console.error('Header', error.headers);
        if (error.meta) {
          console.error('Meta Information', error.meta);
        }
        break;
        
      default:
        break;
    }
  } catch (error) {
    console.error('Error in searchErrorHandler:', error);
  }
}

searchErrorHandler('error connecting to elastic search')


// Elasticsearch security features have been automatically configured!
// -> Authentication is enabled and cluster connections are encrypted.

// ->  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
//   lhQpLELkjkrawaBoaz0Q

// ->  HTTP CA certificate SHA-256 fingerprint:
//   a52dd93511e8c6045e21f16654b77c9ee0f34aea26d9f40320b531c474676228
// ...
// */

// Add Diagnostic Event Listeners
client.diagnostic.on('response', (error, result) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(result);
  }
});

client.diagnostic.on('serialization', (err, result) => {
  console.log(err, result);
});

client.diagnostic.on('request', (err, result) => {
  console.log(err, result);
});

client.diagnostic.on('deserialization', (err, result) => {
  console.log(err, result);
});

// Correlation ID for Events
client.diagnostic.on('request', (err, result) => {
  const { id } = result.meta.request;
  if (err) {
    console.log({ error: err, reqId: id });
  }
});

client.diagnostic.on('response', (err, result) => {
  const { id } = result.meta.request;
  if (err) {
    console.log({ error: err, reqId: id });
  }
});

// Custom Context in Events
client.diagnostic.on('request', (err, result) => {
  const { id, context } = result.meta.request;
  if (err) {
    console.log({ error: err, reqId: id, context });
  }
});

client.diagnostic.on('response', (err, result) => {
  const { id, context } = result.meta.request;
  if (err) {
    console.log({ error: err, reqId: id, context });
  }
});

// Example Search with Context
const searchResponseWithContext = await client.search({
  index: 'my-index',
  query: { match_all: {} }
}, {
  context: { winter: 'is coming' }
});
console.log(searchResponseWithContext);

// Aborting a Request
const abortController = new AbortController();
setImmediate(() => abortController.abort());


//////// creating an index called my-index
await client.indices.create({index: 'my-index'})
////// indexing the my-index index
await client.index({
  index: 'my-index',
  id: 'my-document-id',
  document : {
    foo: 'foo',
    bar: 'bar'
  }
})
///// to get the document use this
await client.get({
  index:'my-index',
  id: 'my-document-id'
})
////////////// searching for documents 
await client.search({
  query: {
    match : {
      foo: 'foo'
    }
  }
})
//////////////// this is how to update the document 
await client.update({
  index:'my-index',
  id: 'my-document-id',
  document: {
    foo: 'foo',
    new_field: 'new feild'
  }

})
/////////// to delete a document 
await client.delete({
  index:'my-index',
  id: 'my-document-id'
})
////// deleting an index 
await client.indices.delete({index:'my-index'})









