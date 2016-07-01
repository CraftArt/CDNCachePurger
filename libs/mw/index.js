var akamai = require("../akamai"),
    persist= require("../persist"),
    debug = require("debug")("Middleware"),
    assert= require("assert");

module.exports = (function(){
    var purge = function(req, res, next) {
            //Only akamai for now, Could add more CDNs in future here
            akamai.requestPurge(function (data) {
                if (data.httpStatus === 201) {  //Request successful
                    debug("Persisting request information.");

                    //Setting initial status without calling akamai api to check status
                    data.purgeStatus = "In-Progress";
                    persist.insert(data, function (result) {
                        debug("Request persisted. " + result.ops.length + " records entered.");
                        res.msg = "Request successful, Purge ID: " + data.purgeId + " Estimated time in seconds:" + data.estimatedSeconds;
                        next();
                    });
                } else {
                    res.msg = "Request unsuccessful";
                    next();
                }
            });
        },
        status = function(req, res, next){
            akamai.checkPurgeStatus(req.params.purgeId, function(data){
                if(data.httpStatus === 200) {
                    persist.update(data, function(err){
                        assert.equal(err, null, "Error while updating the db.");
                        res.msg = "Status : " + data.purgeStatus;
                        next();
                    });
                } else {
                    res.msg = "Request unsuccessful, try again.";
                    next();
                }
            });
        },
        requests = function(req, res, next){
            persist.getRequests(req.params.status, function(data){
                res.data = data;
                next();
            });
        },
        diagnostics = function(req, res, next){
            akamai.requestDiagnostic(function(data){
                res.data = data;
                next();
            });
        };

    return {
        purge: purge,
        status: status,
        requests: requests,
        diagnostics: diagnostics
    };
})();