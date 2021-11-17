const express = require('express');
const router = express.Router();
const Place = require('../models/place.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// GET => render the form to create a new place
router.get('/new', (req, res, next) => res.render('places/new'))
// POST => to create new place and save it to the DB
router.post('/places', (req, res, next) => {
	//3. Instrucciones: Hemos convertido la info del formulario a un objeto 
	//		que cuadre con nuestro modelo

  console.log(req.body)

	let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	}

	Place.create({
		name: req.body.name,
		type: req.body.type,
		location: location
	})
		.then(() => res.redirect("/places"))
		.catch(err => next(err))

});

// GET => to retrieve all the places from the DB
router.get('/places', (req, res, next) => {
	Place.find()
		.then(placesFromDB => res.render('places/places', { places: placesFromDB }))
		.catch(err => next(err))
})

// GET => get the form pre-filled with the details of one place
router.get('/places/:place_id/edit', (req, res, next) => {
	Place.findById(req.params.place_id)
		.then(place => res.render('places/update', { place }))
		.catch(err => next(error))
})

// POST => save updates in the database
router.post('/:place_id', (req, res, next) => {
	const { name, type } = req.body

	Place.findByIdAndUpdate(req.params.place_id, { name, type })
		.then(place => res.redirect(`/places/${req.params.place_id}`))
		.catch(err => next(err))
});

// DELETE => remove the restaurant from the DB
router.get('/places/:place_id/delete', (req, res, next) => {
	Place.findByIdAndRemove(req.params.place_id)
		.then(() => res.redirect('/places'))
		.catch(err => next(err))
});


// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
	Place.find()
		.then(allplaces => {
			res.status(200).json({ places: allplaces });
		})
		.catch(err => console.log(err))
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/api/:id', (req, res, next) => {
	let placeId = req.params.id;
	Place.findById(placeId)
		.then(oneplaceFromDB => res.status(200).json({ place: oneplaceFromDB }))
		.catch(err => next(err))
})

// GET => get the details of one restaurant
router.get('/places/:place_id', (req, res, next) => {
	Place.findById(req.params.place_id)
		.then(place => res.render('places/show', { place: place }))
		.catch(err => next(err))
});





// No sé dónde reutilizar la función "placePlaces para que aparezca el marcador D="
module.exports = router;