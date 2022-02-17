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

// Serve only the static files form the dist directory
app.use(express.static('index.html' + 'src/'));

// Start the app by listening on the default Heroku port
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'src/', 'index.html'));
});
app.listen(process.env.PORT || 8080);
/Users/diamondlee / PersonalWebsite / diamond - lee - web - app / src / index.html