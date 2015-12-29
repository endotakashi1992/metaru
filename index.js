var PORT = process.env.PORT || 3000

var MetaInspector = require('node-metainspector');


var express = require('express')
var app = express()


var corser = require("corser");
app.use(corser.create());


function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return simpleObject // returns cleaned up JSON
    // return JSON.stringify(simpleObject); // returns cleaned up JSON
};

app.get('/', function (req, res) {
  result = {}
    var client = new MetaInspector(req.query.url, { timeout: 5000 });

    client.on("fetch", function(){
      Object.keys(client).map((key)=>{
        if( typeof(client[key]) != 'function' ){
          result[key] = client[key]
        }
      })
      console.log(simpleStringify(result))
      result = simpleStringify(result)
      res.send(result)

    });

    client.on("error", function(err){
        console.log(err);
    });

    client.fetch();
        // res.send("result")

})

app.listen(3000)
