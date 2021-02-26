var Users=require('./models/Users');
var Notes=require('./models/Notes');
var Assignatura=require('./models/Assignatures');
const express = require('express');
const https = require ('https');
const fs = require ('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
let app = express();
const PORT = 5555;
app.use(bodyParser.json());
const accessTokenSecret ='Abes';


  https.createServer({
    key: fs.readFileSync('./certificados/my_cert.key'),
    cert: fs.readFileSync('./certificados/my_cert.crt')
  }, app).listen(PORT, function(){
    console.log("Servidor HTTPS escoltant al port" + PORT + "...");
  });

  const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if(err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        }else{
            res.sendStatus(401);
        }
    };

    const authenticateJWTPROFE = (req,res,next)=>{
        const authHeader = req.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if(err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                if(req.user.role=="professor"){
                    next()
                }
                else{
                    return res.sendStatus(403)
                }
            });
        }else{
            res.sendStatus(401);
        }
    };
    
    const authenticateJWTALUMNE = (req,res,next)=>{
        const authHeader = req.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if(err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                if(req.user.role=="alumne"){
                    console.log(req.user.role)
                    next()
                }
                else{
                    return res.sendStatus(403)
                }
            });
        }else{
            res.sendStatus(401);
        }
    };

    app.post('/login', (req,res) => {
        var usuari = new Users.Users
        usuari.LogIn(req.body.username,req.body.password,res)
    });
    app.post('/register', (req,res) => {
        var usuari = new Users.Users
        usuari.insertUser(req.body.username, req.body.password, req.body.full_name,req.body.dni,req.body.avatar,res,req
        );
    });
    app.get('/notes', authenticateJWT, (req,res) => {
        var notes = new Notes.Notes
        let id = req.user.id
        notes.getNotes(id,res)
    });
    app.get('/notes/:nota', authenticateJWTALUMNE, (req,res)=>{
        var notes = new Notes.Notes
        let id = req.user.id
        let nota = req.params.nota
        notes.getNota(id,nota,res)
    });

    app.get('/moduls', authenticateJWTPROFE, (req,res)=>{
        var notes = new Notes.Notes
        let id = req.user.id
        notes.getModuls(id,res)
    });

    app.get('/assignatura/:assig', authenticateJWTPROFE, (req,res)=>{
        var assignatures = new Assignatura.Assignatura
        let id = req.params.assig
        assignatures.getAssignatura(id,res)
    });