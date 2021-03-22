const express = require('express')
const app = express()
const cors = require('cors')
var path = require('path');

app.use(cors())

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000);
