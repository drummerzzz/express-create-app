var express = require('express');
var load = require('express-load');
var path = require('path');
//var createError = require('http-errors');

module.exports = function(){
    var app = express();
    
    //cofigure views dir, and view engine
    app.set('view engine','ejs');
    app.set('views', './app/views');
    
    //configure json
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    //configure static files
    app.use(express.static(path.join(__dirname, 'public')));
    
    // catch 404 and forward to error handler
    /*app.use(function(req, res, next) {
    next(createError(404));
    });*/

    load('infra',{cwd:'app'})
    .then('models')
    .then('routes')
    .into(app);

    return app;

}