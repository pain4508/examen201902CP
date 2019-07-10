var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


function initIncidentes(db){
        var incidentesColl = db.Collection('incidentes');

        router.get('/', (req, res, next)=>{
            incidentesColl.find().toArray((err, incidentes)=>{
                if(err){
                    console.log(err);
                    return res.status(404).json({"error":"No se pudieron obtener los incidentes"}); 
                }
                return res.status(200).json(incidentes);
            });
        }); //get all
    
        router.get('/:id', (req, res, next)=>{
            var id = new ObjectID(req.params.id);
            incidentesColl.findOne({"_id": id}, (err, doc)=>{
                if(err){
                    console.log(err);
                    return res.status(404).json({"error":"No se puede obtener el incidente, Intenta de nuevo"});
                }
                return res.status(200).json(doc);
            }); //findOne
        }); //get ById
        
        router.post('/', (req, res, next)=>{
            var newIncidente = Object.assign(
                {},
                 {
                  "descripcion":"",
                  "fechaYHora":"",
                  "tipo":"",
                  "estado":"",
                  "usuarioRegistra":"",
                  "usuarioAsignado":"",
                  "fechaHoraAsignado":new Date().getTime(),
                  "fechaHoraCerrado":""
                }, 
                    req.body
                );
                incidentesColl.insertOne(newIncidente, (err, rst)=>{
                    if(err){
                        console.log(err);
                        return res.status(404).json({"error":"No se pudo agregar el nuevo incidente"});
                    }   
                    if(rst.ops.length==0){
                        console.log(rst);
                        return res.status(404).json({"error":"No se pudo agregar el nuevo incidente"});
                    }
                     return res.status(200).json(rst.ops[0]);
                     
                });
        });//post
        
        

        return router;
    }
module.exports = initIncidentes;