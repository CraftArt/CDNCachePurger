"use strict";
var express = require("express"),
    debug = require("debug")("purge"),
    capture = require("capture"),
    mWare = require("../libs/mw");

var router = express.Router();

router.get("/preview/:url", function(req, res, next){
    debug("Yo Capturing");
});

router.get("/", [mWare.purge], function(req, res) {
    res.send(res.msg);
});

router.get("/status/:purgeId", [mWare.status], function(req, res){
    res.send(res.msg);
});

router.get("/requests/:status", [mWare.requests], function(req, res){
    res.send(res.data);
});

router.get("/diag", [mWare.diagnostics], function(req, res){
    res.send(res.data);
});

/*router.get("/testdb", function(req, res, next){

    persist.insert({"vivek": "thakur", httpStatus: 200}, function (result) {
        debug(result.ops.length + " records entered.");
        res.send("DB Insertion successful");
    });
});*/

module.exports = router;
