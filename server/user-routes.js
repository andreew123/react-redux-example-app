const express = require('express'),
    _       = require('lodash'),
    jwt     = require('jsonwebtoken'),
    dotenv     = require('dotenv'),
    path = require('path');

let app = module.exports = express.Router();

require(path.join(__dirname, './routes/', 'finance'))(app);
require(path.join(__dirname, './routes/', 'billing'))(app);
require(path.join(__dirname, './routes/', 'user'))(app);
require(path.join(__dirname, './routes/', 'company'))(app);
require(path.join(__dirname, './routes/', 'auth'))(app);
