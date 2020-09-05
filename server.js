const express = require('express');

const app = express();

app.listen(3000, function() {
    console.log(`servidor rodando na porta 3000`);
});

app.get('/', function(request, response) {
    response.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Hello World </h1>
            </body> 
        </html>
    `);
});

app.get('/livros', function(request, response) {
    response.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Listagem de Livros </h1>
            </body> 
        </html>
    `);
});
// const http = require('http');

// const server = http.createServer(function(request, response) {

//     let html = '';
//     if (request.url == '/') {
//         html = `
//             <html>
//                 <head>
//                     <meta charset="utf-8">
//                 </head>
//                 <body>
//                     <h1> Hello World </h1>
//                 </body> 
//             </html>
//           `;
//     } else if (request.url == '/livros') {
//         html = `
//         <html>
//             <head>
//                 <meta charset="utf-8">
//             </head>
//             <body>
//                 <h1> Listagem de Livros </h1>
//             </body> 
//         </html>
//       `;
//     }
//     response.end(html)
// });
// server.listen(3000);