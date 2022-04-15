function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

//Install express server
const cheerio = require('cheerio');
const express = require('express');
const app = express();
app.use(requireHTTPS);


// GET /style.css etc
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

// Start the app by listening on the default Heroku port
const fs = require('fs');

app.get('/', function(req, res) {
    res.sendFile('/public/index.html', { root: __dirname })
});

// function browserRefresh(filePath) {
//     var html = fs.readFileSync(filePath);
//     var $ = cheerio.load(html);
//     $('body').append(`<script src="${process.env.BROWSER_REFRESH_URL}"></script>`);
//     return $.html();
// }
app.listen(process.env.PORT || 8080);