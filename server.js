const http = require('http');

const server = http.createServer(function(request, response) {
    response.end(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Hello World </h1>
            </body> 
        </html>
        `)
});

server.listen(3000);