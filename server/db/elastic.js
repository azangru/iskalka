var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

exports.create = function(data){
  client.create({
    index: 'iskalka',
    type: 'paragraphs',
    id: data.id,
    body: {
      left: data.left,
      right: data.right,
      book_id: data.BookId
    }
  }, function (error, response) {
    console.log("response", response);
  });
};


exports.search = function(query){
  return client.search({
    // q: query,
    index: 'iskalka',
    size: 10000,
    body: {
      query: {
        multi_match: {
          query: query,
          fields: ["left", "right"],
          operator: "and"
        }
      }
    }
  });
};







// client.ping({
//   // ping usually has a 3000ms timeout 
//   requestTimeout: Infinity,
 
//   // undocumented params are appended to the query string 
//   hello: "elasticsearch!"
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });


/* == A typical 'body' object of a query

  {
    "took": 6,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": {
      "total": 2,
      "max_score": 0.11506981,
      "hits": [
        {
          "_index": "iskalka",
          "_type": "string",
          "_id": "1",
          "_score": 0.11506981,
          "_source": {
            "title": "Test 1",
            "published": true,
            "published_at": "2013-01-01",
            "counter": 1
          }
        },
        {
          "_index": "iskalka",
          "_type": "string",
          "_id": "2",
          "_score": 0.11506981,
          "_source": {
            "title": "Test 1",
            "published": true,
            "published_at": "2013-01-01",
            "counter": 1
          }
        }
      ]
    }
  }

*/
