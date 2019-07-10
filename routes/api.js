var express = require('express');
var router = express.Router();

function initAppi(db){

   var incidRoutes = require('./api/incidentes');
   router.use('/incidentes', incidRoutes);
   return router;
}

module.exports = initAppi;