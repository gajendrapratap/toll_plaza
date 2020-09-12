const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');


const receipt = require('./routes/receipt');

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.use('/receipt',receipt);

app.use((err, req, res, next) => {
    if (res.status) {
        return res.status(err.status || err.statusCode || 500).send(err.message);
    }
    return;
});

app.listen(3001, () => {
    console.log("server running on http://localhost:3001/");
});