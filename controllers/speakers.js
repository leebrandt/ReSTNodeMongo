module.exports = function(server){

    var _ = require('underscore'),
        data = require('../data/provider');

    server.get('/speakers', function(req,res,next){
        data.list('speakers', function(err, speakers){
            if(err){
                res.send(500, {code:'InternalError', message:err});
                return next;
            }
            _.each(speakers, function(speaker){
                _.extend(speaker, {href: '/speakers/' + speaker._id});
            });
            res.send(200, speakers);
            return next;
        });
    });

    server.get('/speakers/:id', function(req,res,next){
        data.findById('speakers', req.params.id, function(err, speaker){
            if(err){
                res.send(500, {code:'InternalError', message:err});
                return next;
            }
            if(!speaker){
                res.send(404, {code:'ResourceNotFound', message:'No speaker with id ' + req.params.id + ' was found.'});
                return next;
            }
            _.extend(speaker, {href: '/speaker/' + speaker._id});
            res.send(200, speaker);
            return next;
        });
    });
}