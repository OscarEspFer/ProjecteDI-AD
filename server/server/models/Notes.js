var db=require('../db/database');
const jwt = require('jsonwebtoken');
const express = require('express');
const accessTokenSecret ='Abes';
const refreshTokenSecret ='Slig';
const refreshTokens = [];
class Notes{

    mydb=new db.Database();

    constructor(){}




    getNotes(id,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT * FROM notes as n, assignatura as a WHERE (n.id_alumne = ? and n.id_assig = a.id_assig) "
        conn.query(sql,[id],(err,results)=>{
            if (err){
                console.log(err)
                res.status(401).send({
                    OK:false,
                    error:"Error al buscar notes"
                });
            }
            else{
                var notes = []
                results.forEach(element => {
                    notes.push({
                        nota: element.nota,
                        id_assig: element.id_assig,
                        cod_assig: element.cod_assig,
                        links: {
                            get: "GET https://localhost:5555/assignatura/"+element.id_assig
                        }
                    })
                });
                res.send({
                    notes: notes
                })
            }
        })
    }
    getNota(id,id_assig,res){
        let conn=this.mydb.getConnection();
        let sql = "SELECT * FROM notes as n, assignatura as a WHERE (n.id_alumne = ? and n.id_assig = a.id_assig and a.id_assig = ?)"
        conn.query(sql,[id,id_assig],(err,results)=>{
            if (err){
                console.log(err)
                res.status(401).send({
                    OK:false,
                    error:"Error al buscar nota"
                });
            }
            else{
                var nota = []
                results.forEach(element => {
                    nota.push({
                        nota: element.nota,
                        id_assig: element.id_assig,
                        cod_assig: element.cod_assig,
                        link: {
                            get: "GET https://localhost:5555/assignatura/"+element.id_assig
                        }
                    })
                });
                res.send({
                    nota: nota
                })
            }
        })
    }
    getModuls(id,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT DISTINCT a.modul FROM notes as n, assignatura as a WHERE (n.id_profe = ? and n.id_assig = a.id_assig);"
        conn.query(sql,[id],(err,results)=>{
            if (err){
                console.log(err)
                res.status(401).send({
                    OK:false,
                    error:"Error al buscar els moduls"
                });
            }
            else{
                var notes = []
                results.forEach(element => {
                    notes.push({
                        modul: element.modul,
                    })
                });
                res.send({
                    Moduls: notes
                })
            }
        })
    }
    getAssignaturaModul(id,res){
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
    Notes:Notes
}