module.exports = (function(){
    var _oneUrl = {
            id: "REQ123",
            urls: ["http://www.path-to-page.com"]
        },
        _twoUrl = {
            id: "REQ124",
            urls: [
                "http://www.path-to-page1.com",
                "http://www.path-to-page2.com",
            ]
        };
    return {
        req1: _oneUrl,
        req2: _twoUrl
    };
})();