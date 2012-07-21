
var app  = require('http').createServer(handler),
    io   = require('socket.io').listen(app),
    url  = require('url'),
    path = require('path'),
    fs   = require('fs');
 
app.listen(8080);
 
function handler(req, res) {
    var uri      = url.parse(req.url).pathname,
        filename = path.join(__dirname, 'public', uri);

    fs.exists(filename, function (exists) {
        if (!exists) {
            //            res.writeHead(404, {'Content-Type': 'text/plain'});
            //            res.end('404 Not Found\n');
            //            return;
            filename = path.join(__dirname, 'public', 'index.html');
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, 'binary', function (err, file) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(err + '\n');
                return;
            }

            res.writeHead(200);
            res.end(file, 'binary');
        });
    });
}

io.sockets.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });

    socket.on('write', function (data) {
        socket.broadcast.emit('read', data);
        console.log(data);
    });
});
