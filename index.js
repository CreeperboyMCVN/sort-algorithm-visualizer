const express = require('express')
// host files in /public folder
const publicDir = __dirname + '/public'
const app = express()

app.use('/', function(req, res) {
    // serve index.html for all routes
    switch (req.path) {
        case "/": 
            res.sendFile("index.html", { root: publicDir })
            break;
        case "/selection-sort": 
            res.sendFile("selection-sort.html", { root: publicDir })
            break;
        default:
            if (req.path.includes("/assets/")) {
                res.sendFile(req.path, { root: publicDir })
                break;
            }
            res.sendFile("index.html", { root: publicDir })
            break;
    }
})

// listen on port 3000
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now listening at http://localhost:%s", port);
});

module.exports = app