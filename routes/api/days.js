var Promise = require('bluebird');
var router = require('express').Router();
var chalk = require('chalk');
var db = require('../../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Place = db.model('place');
var Day = db.model('day');
var DayRestaurant = db.model('day_restaurant');
var DayActivity = db.model('day_activity');

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
	//chalk.magenta('Params:', req.params); this didnt log anything
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

// http://docs.sequelizejs.com/en/latest/docs/associations/#belongs-to-many-associations check the belongs-to-many associations methods to create the routes!!!
router.post('/:id/restaurants/:restaurantId', function(req, res, next) {
	DayRestaurant.create({
		dayId: +req.params.id,
		restaurantId: +req.params.restaurantId
	})
		.then(daysRestaurant => res.json(daysRestaurant))
		.catch(next)
});

router.delete('/:id/restaurants/:restaurantId', function(req, res, next) {
	 DayRestaurant.destroy({
		where: {
			dayId: +req.params.id,
			restaurantId: +req.params.restaurantId
		}
	})
		.then(() => res.sendStatus(204))
		.catch(next)
});

router.post('/:id/activities/:activityId', function(req, res, next) {
	DayActivity.create({
		dayId: +req.params.id,
		activityId: +req.params.activityId
	})
		.then(daysActivity => res.json(daysActivity))
		.catch(next)
});

router.delete('/:id/activities/:activityId', function(req, res, next) {
	 DayActivity.destroy({
		where: {
			dayId: +req.params.id,
			activityId: +req.params.activityId
		}
	})
		.then(() => res.sendStatus(204))
		.catch(next)
});

module.exports = router;
















