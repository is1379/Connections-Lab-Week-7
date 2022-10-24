let express = require('express');
let server = express();
server.use('/', express.static('public')); 
server.use(express.json()); 

let DataStore = require('nedb');
let db = new DataStore('thoughts.db');
db.loadDatabase();

server.get('/thought-history', (request, response) => {

  db.find({}, (err, docs) => {
    if (err) {
      response.json({ task: "task failed" });
    } else {
      let messageData = {
        data: docs
      }
      response.json(messageData);
    }
  })
});

server.post('/new-thought', (request, response) => {
  let data = {
    content: request.body
  }

  db.insert(request.body, (err, newDocs) => {
    if (err) {
      response.json({ task: "Failed to save data to thoughts.db" });
    } else {
      response.json(data);
    }
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000")
})