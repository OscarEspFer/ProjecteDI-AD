var db=require('../db/database');
const jwt = require('jsonwebtoken');
const express = require('express');
const accessTokenSecret ='Abes';
class Users{

    mydb=new db.Database();

    constructor(){}



    getNewId(callback){
        let conn=this.mydb.getConnection();
        let sql="SELECT max(id)+1 as newID from users";
        conn.query(sql, (err,results,fields)=>{
            if (err){
                console.log(err)
            }
            else{
                conn.end();
                callback(results[0].newID);
            }
        });
    }

    insertUser(username,password,full_name,dni,avatar,res,req){
        let conn=this.mydb.getConnection();
        let sql="INSERT INTO users(username,password,full_name,avatar) "+
                "VALUES (?,?,?,?)"
        

        conn.query(sql,[username,password,full_name,avatar],(err,results)=>{
            if (err){
                console.log(err);
                res.status(401).send({
                    OK:false,
                    error:"Error inserint dades"+err
                });
            }
            else{
                sql = "SELECT * FROM  dni_profe where dni = ?"
                let id = results["insertId"]
                conn.query(sql,[dni],(err,results)=>{
                    if (results.length > 0){
                        sql = "INSERT INTO professor (id_professor) VALUES (?)"
                        conn.query(sql,[id],(err,results)=>{
                            if (err){
                                res.status(401).send({
                                    OK:false,
                                    error:"Error al insertar professor"+err
                                });
                            }
                            else{
                                res.status(200).send({
                                    OK:true,
                                    result:"professor insertat amb exit"
                                });
                            }
                        });
                    }
                    else{
                        sql = "INSERT INTO alumne (id_alumne) VALUES (?)"
                        conn.query(sql,[id],(err,results)=>{
                            if (err){
                                res.status(401).send({
                                    OK:false,
                                    error:"Error al insertar alumne"+err
                                });
                            }
                            else{
                                let autToken = jwt.sign({
                                    id:id,
                                    username:req.body.username,
                                    full_name:req.body.full_name,
                                    dni:req.body.dni,
                                    role:"alumne"
                                }, accessTokenSecret)
                                res.status(200).send({
                                    OK:true,
                                    result:"alumne insertat amb exit",
                                    token:autToken
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    LogIn(username,password,callback){
        let conn=this.mydb.getConnection();
        let sql="SELECT * FROM users WHERE username = ? and password = ?";
        conn.query(sql,[username,password],(err,results,fields)=>{
            if(err){
                console.log(err);
            }
            else{
                conn.end();
                callback(results);
            }
        });
    }

    esProfessor(dni,callback){
        let conn=this.mydb.getConnection();
        let sql="SELECT * from dni_profe where dni =?";
        conn.query(sql,[dni], (err,results,fields)=>{
            if (err){
                console.log(err)
            }
            else{
                conn.end();
                callback(results);
            }
        });
    }

}



module.exports={
    Users:Users
}