const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./app.js')

// Config
  // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

  // Body-Parser
    app.use(bodyParser.urlencoded({extend: false}))
    app.use(bodyParser.json())


// Rotas
  app.get('/cad', function(req, res){
    //res.send("ROTA DE CADASTRO")
    res.render('cadastroUsuario')
  })

  app.get('/', function(req, res){
    // Rota home
    res.render('home');
  });

  app.get('/test', function(req, res){
    res.send('ola');
  });

  app.post('/add', function(req, res){

    Post.queryInsertUser({
      id_usuario: req.body.id_usuario,
      CPF: req.body.CPF,
      nome_completo: req.body.nome_completo,
      email: req.body.email,
      senha: req.body.senha,
      telefone: req.body.telefone,
      linkedin: req.body.linkedin,
      site: req.body.site
    }).then((data) => {
      res.send("Post criado com sucesso")
    }).catch(function(erro){
        res.send("Post deu erro" + erro)
      })
  });


app.listen(8081, function(){
  console.log("Servidor Rodando na url http://localhost:8081");
});
