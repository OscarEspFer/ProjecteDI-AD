var db=require('../db/database');
const jwt = require('jsonwebtoken');
const express = require('express');
const accessTokenSecret ='Abes';
const refreshTokenSecret ='Slig';
const refreshTokens = [];
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
        let sql ="SELECT username FROM users WHERE username = ?"
        conn.query(sql,[username],(err,result)=>{
            if (result.length > 0){
                res.status(400).send({
                OK:false,
                error:"Error usuari ja existent"
                });
            }
            else{
                sql="INSERT INTO users(username,password,full_name,avatar) "+
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
                                        let autToken = jwt.sign({
                                            id:id,
                                            dni:req.body.dni,
                                            role:"professor"
                                        }, accessTokenSecret,{ expiresIn:'2h'})
                                            const refreshToken = jwt.sign({ 
                                            id:id,
                                            username:username,
                                            role:"professor" },refreshTokenSecret);
                                            refreshTokens.push(refreshToken);
                                        res.status(200).send({
                                            OK:true,
                                            result:"professor insertat amb exit",
                                            token:autToken
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
                                            dni:req.body.dni,
                                            role:"alumne"
                                        }, accessTokenSecret,{ expiresIn:'2h'})
                                            const refreshToken = jwt.sign({ 
                                            id:id,
                                            username:username,
                                            role:"alumne" },refreshTokenSecret);
                                            refreshTokens.push(refreshToken);
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
        });
    }

    LogIn(username,password,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT * FROM users WHERE username = ? and password = ?"
        conn.query(sql,[username,password],(err,results,req)=>{
            if(err){
                console.log(err);
            }
            else{
				if (results.length){
					let id = results[0].id
					sql = "SELECT * FROM professor WHERE id_professor = ?"
					conn.query(sql, [id], (err,results)=>{
                        console.log(results.length)
							if(results != null && results.length != 0){
								let autToken = jwt.sign({
                                    id:id,
                                    username:username,
                                    role:"professor"
                                }, accessTokenSecret,{ expiresIn:'2h'})
									const refreshToken = jwt.sign({ 
									id:id,
									username:username,
									role:"professor" },refreshTokenSecret);
									refreshTokens.push(refreshToken);
                                res.status(200).send({
                                    OK:true,
                                    result:"Eres profe",
                                    token:autToken
                                });
							}else{
								let autToken = jwt.sign({
                                    id:id,
                                    username:username,
                                    role:"alumne"
                                }, accessTokenSecret,{ expiresIn:'2h'})
									const refreshToken = jwt.sign({ 
									id:id,
									username:username,
									role:"alumne" },refreshTokenSecret);
									refreshTokens.push(refreshToken);
                                res.status(200).send({
                                    OK:true,
                                    result:"Eres alumne",
                                    token:autToken
                                });
							}
						})
					}
				}
            })
        };

}



module.exports={
    Users:Users
}