const {Router} = require('express')
var express = require("express");
const router = Router();
var app = express();
const { poolPromise } = require('./db') 

var bodyParser = require("body-parser");


module.exports = router;

