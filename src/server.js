function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

//Install express server
const express = require('express');
const app = express();
app.use(requireHTTPS);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/diamond-lee-web-app'));

app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/diamond-lee-web-app/index.html'));
});


// // GET /style.css etc
// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))

// app.get('/', function(req, res) {
//     res.sendFile('/public/index.html', { root: __dirname })
// });

app.listen(process.env.PORT || 8080);