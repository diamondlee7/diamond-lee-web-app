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
app.use('dist/diamond-lee-web-app', express.static(path.join(__dirname, '/')));

// Start the app by listening on the default Heroku port
app.get('*', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});
app.listen(process.env.PORT || 8080);