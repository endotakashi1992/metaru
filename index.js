console.log("hello")
var MetaInspector = require('node-metainspector');
var client = new MetaInspector("http://www.lifehacker.jp/", { timeout: 5000 });

client.on("fetch", function(){
    console.log("Description: " + client.description);

});

client.on("error", function(err){
    console.log(error);
});

client.fetch();
