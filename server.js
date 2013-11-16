var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', "*");
    next();
});

require('./controllers/default')(server);
require('./controllers/speakers')(server);

var port = process.env.PORT || 8000;
server.listen(port, function(){
    console.log('%s listening at %s', server.name, server.url);
});