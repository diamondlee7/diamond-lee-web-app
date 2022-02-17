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
app.use(express.static(__dirname + '/src'));

// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

// GET /static/style.css etc.
app.use('/static', express.static(__dirname + '/src'));

// Start the app by listening on the default Heroku port
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../src') });
});
app.listen(process.env.PORT || 8080);