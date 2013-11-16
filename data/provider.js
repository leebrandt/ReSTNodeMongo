var mongo = require("mongodb"),
    mongoClient = mongo.MongoClient,
    BSON = mongo.BSONPure;

exports.list = function(collectionName, callback){
    console.log('connecting to the database');
    mongoClient.connect('mongodb://localhost/kcdc', null, function(err, db){
        if(err){
            callback(err);
        }

        db.collection(collectionName, function(err, collection){
            collection.find().toArray(function(err, items){
                if(!err){
                    callback(null, items);
                }else{
                    callback(err);
                }
                db.close();
            });
        });
    });
}

exports.findById = function(collectionName, id, cb){
    mongoClient.connect('mongodb://localhost/kcdc', null, function(err, db){
        if(err){
            cb(err);
        }
        db.collection(collectionName, function(err, collection){
            var o_id = new BSON.ObjectID(id);
            collection.findOne({_id:o_id}, function(err, item){
                if(!err){
                    cb(null, item);
                }else{
                    cb(err);
                }
                db.close();
            });
        });
    });
}