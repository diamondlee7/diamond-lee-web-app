function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

//Install express server
const path = require('path');
const express = require('express');
const app = express();
app.use(requireHTTPS);

// GET /style.css etc
app.use(express.static(__dirname + '/src/index.html'));

// Start the app by listening on the default Heroku port
const fs = require('fs');

app.get('/', function(req, res) {
    res.send(browserRefresh('index.html'));
});

function browserRefresh(filePath) {
    var html = fs.readFileSync(filePath);
    var $ = cheerio.load(html);
    $('body').append(`<script src="${process.env.BROWSER_REFRESH_URL}"></script>`);
    return $.html();
}
app.listen(process.env.PORT || 8080);