var Users=require('./models/Users');
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
            const token = authHeader.split('')[1];
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
    app.post('/login', (req,res) => {
        var usuari = new Users.Users
        usuari.LogIn(req.body.username, req.body.password,(resposta)=>{
            if (resposta) {
                let autToken = jwt.sign({
                    username:req.body.username,
                }, accessTokenSecret)
                res.status(200).json({autToken});
            }else{
                res.status(400).send({ok:false, msg:"El usuario o password es incorrecto"});
            }
        });
    });
    app.post('/register', (req,res) => {
        var usuari = new Users.Users
        usuari.insertUser(req.body.username, req.body.password, req.body.full_name,req.body.dni,req.body.avatar,res,req
        );
    });
        