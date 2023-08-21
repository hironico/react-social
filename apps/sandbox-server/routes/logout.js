var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
   req.session.destroy();
   res.status(200).send().end();
});

module.exports = router;
