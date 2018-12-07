var express = require('express');
var load = require('express-load');
var path = require('path');

module.exports = function(){
    var app = express();
    
    //cofigure views dir, and view engine
    app.set('view engine','ejs');
    app.set('views', './app/views');
    
    //configure json
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    //configure static files
    app.use(express.static('./app/public'));
    
    load('models',{cwd:'app'})
    .then('routes')
    .into(app);

    return app;

}