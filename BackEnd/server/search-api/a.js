
// /////////////////////// query and filter context example 


// const response1 = await client.search({
//     body: {
//       query: {
//         bool: {
//           must: [
//             {
//               match: {
//                 title : 'Search'
//               }
//             },
//             {
//             match : {
//               content: 'ElasticSearch'
//             }
//           }
//           ],
//           filter : [
//             {
//               term: {
//                 status: 'published'
//               }
//             },
//             {
//               range: {
//                 publish_date: { 
//                   gte: '2024-01-01'
//                 }
//               }
//             }
//           ]
//         }
//       }
//     }
//   })
  
  
  
//   console.log(response1)
  
  
  
  
  
  
  
  

// //////////////////// COMPOUND QUERIES

// //////////// BOOL QUERY
// ///// The bool query is the most commonly used compound query. It allows you to combine multiple queries with boolean logic (must, should, must_not, and filter).


// // {
// //   "query" : {
// //     'bool': {
// //       "must" : [
// //        { "match": { "title": 'elasticsearch'}}
// //       ],
// //       "filter" : [
// //         {"term": {"year" : 2020}}
// //       ],
// //       "must_not" : [
// //         {"match": {"author": "john doe"}}
// //       ],
// //       "should": [
// //         {"match" : {"title": "Guide"}}
// //       ]

// //     }
// //   } 
// // }

// //////////////// BOOSTING QUERY

// ////// The boosting query allows you to decrease the score of documents that match a negative query, even if they also match the positive query.

// // {
// //   "query" : {
// //     "boosting" : {
// //       "postive" : {
// //         "match" : {"title": "ElasticSearch"}
// //       },
// //       "negative" : {
// //         "ranage" : {"price" : {"gt" : 100}}
// //       }, 
// //       "negative_boost" : 0.5
// //     }
// //   }
// // }


// ///////////// CONSTANT SCORE QUERY
// /////// The constant_score query wraps another query and assigns a constant score to all documents matching the wrapped query.

// // {
// //   "query" : {
// //     "constant_score" : {
// //       "filter" : {
// //         "term" : {"year": 2020}
// //       },
// //       "boost" : 1.2
// //     }
// //    }
// // }


// //////////// DIS MAX QUEURY

// /////////  The dis_max (disjunction max) query allows you to combine multiple queries and uses the score of the single best-matching query clause.



// // {
// //   "query" : {
// //     "dis_max" : {
// //       "queries" : [
// //         {"match" : {"title" : "ElasticSearc"}},
// //         {"match" : {"content" : "lucene"}}
// //       ],
// //       "tie_breaker" : 0.7
// //     }
// //   }
// // }


// //////////////// FUNCTION SCORE QUERY
// /////////// The function_score query modifies the scores of documents returned by a query using custom functions.


// // {
// //   "query": {
// //     "function_score": {
// //       "query": { "match": { "title": "Elasticsearch" } },
// //       "functions": [
// //         {
// //           "gauss": {
// //             "publish_date": {
// //               "origin": "2020-01-01",
// //               "scale": "365d",
// //               "decay": 0.5
// //             }
// //           }
// //         },
// //         {
// //           "field_value_factor": {
// //             "field": "sales",
// //             "factor": 1.2,
// //             "modifier": "sqrt",
// //             "missing": 1
// //           }
// //         }
// //       ],
// //       "boost_mode": "multiply"
// //     }
// //   }
// // }





// //////////////////////////// FULL TEXT QUERIES EXAMPLE
// ///////////// Full text queriesedit
// //The full text queries enable you to search analyzed text fields such as the body of an email.
// // The query string is processed using the same analyzer that was applied to the field during indexing.


// /////// INTERVALLLS QUERY

// {
//     "query" : {
//       "intervals" : {
//         "my_text" : {
//           "all_of" : {
//             "ordered" : 'true',
//             "intervals" : [
//               {
//                 match : {
//                   query : "my favorite food",
//                   max_gaps : 0,
//                   ordered: true
//                 }
//               },
//               {
//                 "any_off" : {
//                   "intervals" : [
//                     { match : { query : 'how water' } },
//                     { match : { query : 'cold porridge'}}
//                   ]
//                 }
//               }
//             ]
//           }
//         }
//       }
//     } 
//   }
  
  
  
//   /////////// auto completion and suggestion and pharse correction
// //2. Autocomplete and Suggesters
// //Example: Implementing a Completion Suggester

// //Use the completion suggester to provide autocomplete suggestions as users type.


// {
//     "mapping": {
//       "properties": {
//         "suggest": {
//           "type": "completion",
//           "fields": {
//             "prefix": {
//               "type": "keyword"
//             }
//           }
//         },
//         "suggest_correction" : {
//           "type" : "text",
//           "analayzer" : "standard",
//           "fields" : {
//             "trigram" : {
//               "type" : "text",
//               "analayzer" : "analyzer"
//             }
//           }
  
//         }
        
//       }
//     },
//     "settings": {
//       "analysis": {
//         "analyzer": {
//           "trigram": {
//             "type": "custom",
//             "tokenizer": "standard",
//             "filter": ["lowercase", "shingle"]
//           }
//         },
//         "filter": {
//           "shingle": {
//             "type": "shingle",
//             "min_shingle_size": 2,
//             "max_shingle_size": 3
//           }
//         }
//       }
//     }
//   }
  
//   /*
//   3. Synonym Matching
//   Example: Using Synonym Filter in Analysis
  
//   Configure a custom analyzer with a synonym filter to handle different variations of search terms.
  
  
//   */
     
//   PUT /myapp
//   {
//     "settings": {
//       "analysis": {
//         "filter": {
//           "synonym_filter": {
//             "type": "synonym",
//             "synonyms": [
//               "elasticsearch, es, elastic search"
//             ]
//           }
//         },
//         "analyzer": {
//           "synonym_analyzer": {
//             "tokenizer": "standard",
//             "filter": ["lowercase", "synonym_filter"]
//           }
//         }
//       }
//     },
//     "mappings": {
//       "properties": {
//         "title": {
//           "type": "text",
//           "analyzer": "synonym_analyzer"
//         },
//         "content": {
//           "type": "text",
//           "analyzer": "synonym_analyzer"
//         }
//       }
//     }
//   }
  
  
//       "highlight" : {
//         "fields": {
//           "tittle" ; {},
//           "content" ; {}
//         }
//       }
  
      
  
  
//     }
  
  
//     //4  Faceted Search and Aggregations
//     // Faceted search allows users to filter search results by various attributes, such as categories, tags, authors, dates, and more. Elasticsearch provides robust support for faceted search through its aggregation framework. Aggregations allow you to compute metrics, statistics, and group data in real-time, which can be used to build dynamic and interactive faceted search features.
    
//     // Example: Faceted Search with Aggregations
//     // Let's assume we have a dataset of articles indexed in Elasticsearch. Each article has fields like type, author, tags, and publication_date. We want to allow users to filter articles by type and author and get a count of articles per type and author.
    
    
  
//     POST /articles/_search
//   {
//     "query": {
//       "match_all": {}
//     },
//     "aggs": {
//       "by_type": {
//         "terms": {
//           "field": "type"
//         }
//       },
//       "by_author": {
//         "terms": {
//           "field": "author"
//         }
//       },
//       "by_tags": {
//         "terms": {
//           "field": "tags"
//         }
//       },
//       "by_publication_date": {
//         "date_histogram": {
//           "field": "publication_date",
//           "calendar_interval": "month"
//         }
//       }
//     }
//   }




// POST /myapp/_search 
// {
//   "query" : {
//     "bool" : {
//       "shoud" : [
//         {
//           "multi_match" : {
//             "query" : "what is elllastic search?",
//             "fileds" : ["title^3", "content"],
//             "type" : "best_fields",
//             "fuzziness" : "AUTO"
//           }
//         },
//         {
//           "match_phrase" : {
//             "content" : {
//               "query" : "what is elastic search",
//               "slop" : 2
//             }
//           }
//         },
//         {
//           "match_pharse" : {
//             "title" : {
//               "query" : "what is elastic search"?,
//               "slop" : 2,
//             }
//           }
//         },
//         {
//           "term" : {
//             "title.keyword" : {
//               "value"  : "what is elastic search?",
//               'boost' : 5
//             }
//           }
//         },
//         {
//           "term" :{
//             "title.content" : {
//               "value"  : "what is elastic search?",
//               'boost' : 2
//             }
//           }
//         },

//         {
//           "mtch" :{
//             "title.tite" : {
//               "value"  : "what is elastic search?",
//               'boost' : 2
//             }
//           }
//         },

//         {
//           "mtch" :{
//             "title.content" : {
//               "value"  : "what is elastic search?",
//               'boost' : 2
//             }
//           }
//         },

//         {
//           "wildcard" : {
//             "title" : {
//               "value" : "what * elastic *",
//               "boost" : 1
//             }
//           }
//         },

//         {
//           "wildcard" : {
//             "content" : {
//               "value" : "what * elastic *",
//               "boost" : 0.5
//             }
//           }
//         },

//         {
//           "preix" : {
//             "title" : {
//               "value" : "what * elastic erch *",
//               "boost" : 1
//             }
//           }
//         },

//         {
//           "preix" : {
//             "content" : {
//               "value" : "what i elastic *",
//               "boost" : 0.5
//             }
//           }
//         },

//         {
//           "fuzzy" : {
//             "title" : {
//               "value" : 'what is elastic search?',
//               "fuzziness" : "AUTO",
//               "boost" : 1
//             }
//           }
//         },

//         {
//           "fuzzy" : {
//             "content" : {
//               "value" : "what is elastic search?",
//               "fuzziness" : "AUTO",
//               "boost" : 1
//             }
//           }
//         },

//         {
//           "more_like_this" : {
//             "fields" : ["title","content"],
//             "like" : "input_text" ,
//             "min_term_freq" : 1,
//             "min_doc_freq" : 1,

//           }
//         }

//        ]
//       }
//     }




//     const { Client } = require('@elastic/elasticsearch');

// const es = new Client({
//   node: 'http://localhost:9200' // Replace with your Elasticsearch URL
// });

// const indexBody = {
//   mappings: {
//     properties: {
//       title: { type: 'text' },
//       author: { type: 'keyword' },
//       genre: { type: 'keyword' }
//     }
//   }
// };

// async function createIndex() {
//   try {
//     await es.indices.create({ index: 'books', body: indexBody });
//     console.log('Index created successfully!');
//   } catch (error) {
//     console.error('Error creating index:', error);
//   }
// }

// createIndex();


//   // Add a single documentedit
//   // Submit the following indexing request to add a single document to the books index. The request automatically creates the index.
  
//   const response = await client.index({
//     index: 'books',
//     document: {
//       name: 'Snow Crash',
//       author: 'Neal Stephenson',
//       release_date: '1992-06-01',
//       page_count: 470,
//     }
//   })
//   console.log(response)
