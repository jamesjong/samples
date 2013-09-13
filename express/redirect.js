/**
 * Module dependencies.
 */

var express = require('../..');

/*
edit /etc/hosts:

127.0.0.1       foo.example.com
127.0.0.1       bar.example.com
127.0.0.1       example.com
*/

// Main server app

var main = express();

main.use(express.logger('dev'));

// serve static files from public folder
main.use(express.static(__dirname + '/public'));

// Redirect app

var redirect = express();

redirect.all('*', function(req, res){
  console.log(req.subdomains);
  // redirect to example.com and append original parameters
  res.redirect('http://example.com:3000' + req.params[0]);
});

// Vhost app

var app = express();

app.use(express.vhost('*.example.com', redirect)) // Serves all subdomains via Redirect app
app.use(express.vhost('example.com', main)); // Serves top level domain via Main server app

app.listen(3000);
console.log('Express app started on port 3000');
