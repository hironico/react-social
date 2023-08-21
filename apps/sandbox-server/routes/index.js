var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('<h1>Hello world!</h1>').end();
});

module.exports = router;
