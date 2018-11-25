var app = require('./app/bin/config')();

//set port server
var port = parseInt((process.env.PORT || '3000'), 10)

app.listen(port, function(){
    console.log('server running in: http://localhost:'+port);
});