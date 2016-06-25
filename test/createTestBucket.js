var remote = require('./gzhelpers.js').remote;

var options = {
  hostname: 'dbdev.gizur.com',
  port: 443,
  path: '/XXX',
  method: 'POST',
};

console.log('A web server should be running on localhost:3000');

// curl -H user: jonas -H password: homeend -d Just some data to store https://odatadev.gizur.com/jonas/b_rootapp
remote.httpsRequest(options, 'hello world').then( console.log.bind(console));
