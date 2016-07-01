"use strict"

var config = {
    akamai: {
        domain: "staging",
        action: "remove",
        type: "arl",
        objects: ["http://www.path-to-page.com"],
        purgeApiPath: "ccu/v2/queues/default",
        diagnosticApiPath: "diagnostic-tools/v1/locations",
        purgeStatusApiPath: "ccu/v2/purges/",
        purgeRequestHeaders: {
            "Content-Type": "application/json"
        },
        postMethod: "POST",
        getMethod: "GET"
    },

    persist: {
        path: "mongodb://localhost:27017",
        db: "CachePurger",
        reqCollection: "requests"
    }

};
module.exports = config;