var db=require('../db/database');
const jwt = require('jsonwebtoken');
const express = require('express');
const accessTokenSecret ='Abes';
const refreshTokenSecret ='Slig';
const refreshTokens = [];
class Assignatura{

    mydb=new db.Database();

    constructor(){}




    getAssignatura(id,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT * FROM assignatura WHERE id_assig = ?"
        console.log(id)
        conn.query(sql,[id],(err,results)=>{
            if (err){
                console.log(err)
                res.status(401).send({
                    OK:false,
                    error:"Error al buscar assignatura"
                });
            }
            else{
                var notes = []
                results.forEach(element => {
                    notes.push({
                        id_assig: element.id_assig,
                        cod_assig: element.cod_assig,
                        nom_assig: element.nom_assig,
                        modul: element.modul,
                        curs: element.curs,
                        hores: element.hores,
                    })
                });
                res.send({
                    notes: notes
                })
            }
        })
    }
}



module.exports={
    Assignatura:Assignatura
}