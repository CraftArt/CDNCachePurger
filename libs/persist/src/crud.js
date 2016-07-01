"use strict";
var connection = require("./connect.js"),
    assert = require("assert"),
    debug = require("debug")("crud");

module.exports = (function(){

    var _db = {};
    var _requestCollection = {};

    function initDBConnectionPool(){
        connection.connect(function(db) {
            assert.notEqual(db, null, "Could not get the db object");
            _db = db;
            _requestCollection = _db.collection(config.persist.reqCollection);
            assert.notEqual(_requestCollection, null, "Could not get the requests collection");
        });
    }

    initDBConnectionPool();

    var insert = function(data, callback) {
        _requestCollection.find({"purgeId": data.purgeId}).count(function(err, count){
            assert.equal(err, null, "Error while inserting into the db. Possible duplicate present.");
            if(count === 0){
                _requestCollection.insert(data, function (error, result) {
                    assert.equal(error, null);
                    if (callback && typeof callback === "function") {
                        return callback(result);
                    }
                });
            }
        });
    };

    var update = function(data, callback) {
        _requestCollection.findOne({"purgeId": data.purgeId}, function (err, result) {
            assert.equal(err, null, "Error while updating the db.");
            if(result) {
                debug(result.purgeStatus + " " + data.purgeStatus);
                if (result.purgeStatus !== data.purgeStatus) {
                    _requestCollection.update({"purgeId": data.purgeId},
                        {
                            "$set": {
                                "purgeStatus": data.purgeStatus,
                                "submissionTime": data.submissionTime,
                                "completionTime": data.completionTime
                            }
                        });
                    debug("Status updated for purgeId " + data.purgeId + " to " + data.purgeStatus);
                }
            } else {
                debug("Purge Id not found to update");
            }
            if (callback && typeof callback === "function") {
                return callback(null);
            }
        });
    };

    var getRequests = function(status, callback) {
        debug("Status : " + status);
        var query = {"purgeStatus": status};
        if(status === "All"){
            query = {};
        }
        _requestCollection.find(query).toArray(function(err, result){
            assert.equal(err, null, "Error while converting cursor to an array.");
            if (callback && typeof callback === "function") {
                return callback(result);
            }
        });
    };

    return {
        insert: insert,
        getRequests: getRequests,
        update: update
    };

})();
