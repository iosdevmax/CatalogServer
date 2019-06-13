let app = require('./app');
let port = process.env.PORT || 3001;

let server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
