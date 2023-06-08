/** Import express */
const express = require('express');
const app = express();

/** Import Morgan */
const morgan = require('morgan')
app.use(morgan('dev'))

/** Import routes midware */
const itemsRoutes = require('./routes/itemsRouter')

app.use(express.json());
app.use('/items', itemsRoutes) // use midware routes


module.exports = app;