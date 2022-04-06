const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let storage = []

const saveData = (data, file) => {
	const jsonData = JSON.stringify(data)
	fs.writeFile(file, jsonData,
		function (error) {
			if (error) {
				console.log('file cant be stored')
				console.error(error)
				return;
			}
			storage = data
			console.log(storage, 'save')
		})
}

const readFile = (path) => {
	fs.readFile(path, 'utf8',
		function (error, data) {
			if (error) {
				console.log('file cant be read')
				console.error(error)
				return;
			}
			storage = JSON.parse(data)
		});
}

fs.access('notes.json', fs.constants.F_OK, (err) => {
	if (err) {
		console.error(err)
		saveData([], 'notes.json')
		return
	}
	readFile('notes.json')
})

//API calls
router.get('/api/notes', async (req, res) => {
	console.log(storage, 'get storage')
	res.send({data: storage})
})

router.post('/api/notes', async (req, res) => {
	let newData = req.body
	console.log(newData)
	await saveData(newData, 'notes.json')
	storage = newData
	res.send({data: storage})
})


app.use('/.netlify/functions/server', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
