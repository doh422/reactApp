require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const Data = require('./data');
const Player = require('./player');
const Game = require('./game');
const Team = require('./team');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// MongoDB
const dbRoute = process.env.MONGO_CONNSTR;

// connects backend to DB
mongoose.connect(dbRoute, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.once('open', () => console.log('connected to database'));

// check if connection to DB successful
db.on('error', console.error.bind(console, 'Mongoose connection error:'));

// parse request body to json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// get method
router.get('/getData', (req, res) => {
	Data.find((err, data) => {
		if (err)
			return res.json({ success: false, error: err});
		return res.json({ success: true, data: data });
	});
})

// update
router.post('/updateData', (req, res) => {
	const {id, update} = req.body;
	Data.findByIdAndUpdate(id, update, (err) => {
		if (err)
			return res.json({ success: false, error: err});
		return res.json({success: true});
	});
})

// delete
router.delete('/deleteData', (req, res) => {
	const {id} = req.body;
	Data.findByIdAndRemove(id, (err) => {
		if (err)
			return res.send(err);
		return res.json({success: true});
	});
})

// create new data
router.post('/putData', (req, res) => {
	let data = new Data();
	const {id, message} = req.body;
	if ((!id && id !== 0) || !message) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS'
		});
	}

	data.message = message;
	data.id = id;
	data.save((err) => {
		if (err)
			return res.json({ success: false, error: err});
		return res.json({ success: true});
	});
})

router.get('/getPlayer', (req, res) => {
	Player.find((err, data) => {
		if (err)
			return res.json({success: false, error: err});
		return res.json({success: true, data: data});
	})
})

router.post('/putPlayer', (req, res) => {
	let player = new Player();
	const {id, firstName, lastName, dateOfBirth, number, stats, img} = req.body;
	if ((!id && id !== 0) || !firstName) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS'
		});
	}
	player.id = id;
	player.firstName = firstName;
	player.lastName = lastName;
	player.dateOfBirth = dateOfBirth;
	player.number = number;
	player.stats = stats;
	player.img = img;
	player.save((err) => {
		if (err)
			return res.json({success: false, error: err});
		return res.json({success: true});
	});
})

// delete
router.delete('/deletePlayer', (req, res) => {
	const {id} = req.body;
	Player.findByIdAndRemove(id, (err) => {
		if (err)
			return res.send(err);
		return res.json({success: true});
	});
})

router.get('/getGames', (req, res) => {
	Game.find((err, data) => {
		if (err)
			return res.json({success: false, error: err });
		return res.json({success: true, data: data});
	})
})

router.post('/putGame', (req, res) => {
	let game = new Game();
	const { id, date, location, homeTeam, roadTeam, status, stats } = req.body;
	if ((!id && id != 0) || !date) {
		return res.json({
			success: false,
			error: 'Missing required fields'
		})
	}
	game.id = id;
	game.date = date;
	game.location = location;
	game.homeTeam = homeTeam;
	game.roadTeam = roadTeam;
	game.status = status;
	game.stats = stats;
	game.save((err) => {
		if (err)
			return res.json({ success: false, error: err })
		return res.json({ success: true })
	})
})

router.post('/updateGame', (req, res) => {
	const {id, update} = req.body;
	Game.findByIdAndUpdate(id, update, (err) => {
		if (err)
			return res.json({success: false, error: err});
		return res.json({success: true});
	})
})

router.get('/getTeams', (req, res) => {
	Team.find((err, data) => {
		if (err)
			return res.json({success: false, error: err})
		return res.json({success: true, data: data})
	})
})

router.post('/putTeam', (req, res) => {
	let team = new Team();
	const {id, name, description, roster} = req.body;
	if ((!id && id != 0) || !name) {
		return res.json({
			success: false,
			error: 'no team name'
		})
	}
	team.id = id;
	team.name = name;
	team.description = description;
	team.roster = roster;
	team.save((err) => {
		if (err)
			return res.json({success: false, error: err})
		return res.json({success: true })
	})
})

router.post('/updateTeam', (req, res) => {
	const {id, update} = req.body;
	console.log(req.body);
	Team.findByIdAndUpdate(id, update, (err) => {
		if (err)
			return res.json({success:false, error: err})
		return res.json({success: true})
	})
})

// append /api for http requests
app.use('/api', router);

// connect backend to port
app.listen(API_PORT, () => console.log('LISTENING ON PORT ' + API_PORT));