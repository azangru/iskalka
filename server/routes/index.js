var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  console.log("I hit the root route!");
  res.end("I hit the root route!");
});

module.exports = router;


/* ===== EXAMPLE =====

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
});

*/

