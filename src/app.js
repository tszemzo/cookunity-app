const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const { sequelize } = require('./db/setup');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.use('/api', routes);

module.exports = app;
