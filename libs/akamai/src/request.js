"use strict";
var edge = require("./edge"),
    debug = require("debug")("request"),
    mockRequests = require("../../mock");

module.exports = (function(){

    var _requestBody = {};
    _requestBody.domain = config.akamai.domain;
    _requestBody.action = config.akamai.action;
    _requestBody.type = config.akamai.type;
    _requestBody.objects = config.akamai.objects;

    debug("Request Body = " + JSON.stringify(_requestBody));

    var sendDiag = function (callback) {
        edge.diagRequest.auth({
            "path": config.akamai.diagnosticApiPath,
            "method": config.akamai.getMethod,
            "body": ""
        }).send(function (data) {
            debug("RESPONSE:" + JSON.stringify(data));
            if (callback && typeof callback === "function") {
                return callback(JSON.parse(data));
            }
        });
    };

    var requestPurge = function(callback) {

        edge.purgeRequest.auth({
            "path": config.akamai.purgeApiPath,
            "method": config.akamai.postMethod,
            "headers": config.akamai.purgeRequestHeaders,
            body: JSON.stringify(_requestBody)
        }).send(function (data) {
            debug("RESPONSE:" + JSON.stringify(data));
            if (callback && typeof callback === "function") {
                return callback(JSON.parse(data));
            }
        });
    };

    var checkPurgeStatus = function(purgeId, callback){
        edge.purgeRequest.auth({
            "path": config.akamai.purgeStatusApiPath + purgeId,
            "method": config.akamai.getMethod
        }).send(function (data) {
            debug("Response = " + JSON.stringify(data));
            if (callback && typeof callback === "function") {
                return callback(JSON.parse(data));
            }
        });
    };

    return {
        requestDiagnostic: sendDiag,
        requestPurge: requestPurge,
        checkPurgeStatus: checkPurgeStatus
    };
})();
