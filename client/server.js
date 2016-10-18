'use strict';



let express = require('express');
let http = require('http');
let app = express();

app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/'));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
