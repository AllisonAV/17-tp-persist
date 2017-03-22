var Promise = require('bluebird');
var router = require('express').Router();

var db = require('../../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Place = db.model('place');
var Day = db.model('day');

router.post('/', (req, res, next) =>
	Day.create({
		number : req.body.number
	})
		.then(days => res.json(days))
		.catch(next)
);

router.get('/', (req, res, next) =>
	Day.findAll({})
		.then(days => res.json(days))
		.catch(next)
);

router.post('/:id/hotels', function(req, res, next) {

	Day.create({
		 number : +req.params.id
		// hotelId: req.params.body
	})
		.then(days => res.json(days))
		.catch(next)
});

module.exports = router;

