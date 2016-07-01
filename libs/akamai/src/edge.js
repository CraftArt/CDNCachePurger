"use strict";
var EdgeGrid = require("edgegrid");

module.exports = (function(){

    var edgeRequest = function(group) {
            var request = new EdgeGrid({
                "path": appRootDir + "/.edgerc",
                "group": group
            });
            return request;
        },
        _diagRequest = edgeRequest("diag-api"),
        _purgeRequest = edgeRequest("purge-api");

    return {
        diagRequest: _diagRequest,
        purgeRequest: _purgeRequest
    };

})();
