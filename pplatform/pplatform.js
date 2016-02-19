
/* 
 * Copyright (C) 2015 Christoph Kutza
 * 
 */
 
var express = require('express');
var app = express();
var http = require('http').Server(app);



//module netgroup. allows us to start the socket.io server
var netgroup = require('./netgroup');



//the app/express module will host all files in the public folder like a good old normal webpage
app.use(express.static('public'));

// 




//setup the netgroup server
var netgroup = new netgroup();
netgroup.listen(http);




//process.env.PORT will be replaced with a pipe by azure if not hosted there the given port is used
var port = process.env.PORT || 3001;

//open the port for clients to connect
http.listen(port, function(){
    console.log('listening on *:' + port);
    
});

