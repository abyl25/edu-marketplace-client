const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));
// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/index.html'));

const port = process.env.PORT || 8000;
app.listen(port);
