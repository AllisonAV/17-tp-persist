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

router.get('/:id', (req, res, next) =>
	Day.findOne({
		where: {
			number: +req.params.id
		}
	})
		.then(day => res.json(day))
		.catch(next)
);

router.delete('/:id', function (req, res, next) {
	Day.findOne({
		where: {
			number: +req.params.id
		}
	})
		.then(day => day.destroy())
		.then(() => res.sendStatus(204))
		.catch(next)
})

router.put('/:id/hotel/:hotelId', function(req, res, next) {
	Day.findOne({
		where: {
			number: +req.params.id
		}
	})
	.then(function(day){
		day.hotelId = +req.params.hotelId
		if(day.hotelId === -1){
			day.hotelId = null;
		}
		return day.save()
	})
		.then(days => res.json(days))
		.catch(next)
});

// router.put('/:id/hotel', function(req, res, next) {
// 	Day.findOne({
// 		where: {
// 			number: +req.params.id
// 		}
// 	})
// 	.then(function(day){
// 		day.hotelId = null
// 		return day.save()
// 	})
// 		.then(days => res.json(days))
// 		.catch(next)
// });

router.put('/:id/restaurants/:restaurantId', function(req, res, next) {
	Day.findOne({
		where: {
			number: +req.params.id
		}
	})
	.then(function(day){
		day.restaurantId = +req.params.hotelId
		if(day.hotelId === -1){
			day.hotelId = null;
		}
		return day.save()
	})
		.then(days => res.json(days))
		.catch(next)
});

module.exports = router;

