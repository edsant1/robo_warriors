var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();

/*GET robo names*/
router.get('/', function(req, res) {
	redisClient.smembers("robo", function(err, robo) {
		res.locals.robo = robo ? robo : [];
		res.render('robo');
	});
});

/*POST add robo*/
router.post('/', function(req, res)	{
	redisClient.sadd("robo", req.body.name);
	res.redirect("/robo");
});

/*DELETE removes robo*/
router.get('/delete/:name', function(req, res) {
	redisClient.srem("robo", req.params.name);
	res.redirect("/robo");
});

module.exports = router;
