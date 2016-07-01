"use strict";
var assert = require("assert"),
    debug = require("debug")("connect");

module.exports = (function(){

    var _MongoClient = require("mongodb").MongoClient,
        _url = config.persist.path + "/" + config.persist.db;

    debug("Will connect to " + _url );
    var testConnection = function() {
        _MongoClient.connect(_url, function (err, db) {
            if(!err) {
                debug("Test connection made successfully. Closing it now.");
                db.close();
            }
            assert.notEqual(1,1, "Error Connecting to test DB");
        });
    };

    var connect = function(callback){
        _MongoClient.connect(_url, function (err, db) {
            if(!err) {
                debug("Connected correctly to DB server");
                if (callback && typeof callback === "function") {
                    return callback(db);
                }
            }
            assert.notEqual(1,1, "Error Connecting to DB");
        });
    };

    return {
        test: testConnection,
        connect: connect
    };

})();
