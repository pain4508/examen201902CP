var express = require('express');
var router = express.Router();

function initAppi(db){
    
     var incidentesRoutes = require('./api/incidentes');
     router.use('/incidentes', incidentesRoutes);

     return router;
}
module.exports = initAppi;