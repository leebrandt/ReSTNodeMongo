module.exports = function(server){

    server.get('/', function(req,res,next){
        var apiDetails = {
            apiName: 'ReST Demo API',
            apiVersion: '0.1',
            resources:[
                { Session: '/sessions' },
                { Session: '/speakers' }
            ]
        };
        res.send(200, apiDetails);
        return next;
    });

}