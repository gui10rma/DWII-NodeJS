const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extented: false}))
app.set(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeirapagina")
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco" + erro)
    })
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.data,
        observacao: req.body.observacao
    }).then(function(){
        res.send("Dados enviado com sucesso")
    }).catch(function(error){
        res.send("Erro: "+error)
    })
})

app.get("/buscar", function(req, res){
    res.send("primeira_pagina")
})

app.listen(8081, function(){
    console.log("Servidor ativo")
})