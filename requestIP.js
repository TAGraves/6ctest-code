"use strict";
var https = require('https');
var crypto = require('crypto');

module.exports = function (req, res) {
  var api_secret_key = 'SECRET WOULD GO HERE';
  var base_url = 'https://cloud.6connect.com/6c_2543';
  var query_string = decodeURIComponent(req.query.apiquery);
  var hash = crypto.createHmac('sha256', api_secret_key).update(query_string).digest('base64');
  https.get(base_url + '/api/v1/api.php?' + query_string + '&hash=' + hash, function (api_res) {
    var data = '';

    api_res.on('data', function (chunk) {
        data += chunk;
    });

    api_res.on('end', function () {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });
};
