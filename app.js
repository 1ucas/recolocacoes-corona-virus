var express = require('express');
const path = require('path');
const fs = require('fs');
var app = express();
const caminhoRaiz = "dados/";

const listarFuncionarios = function(cidade,empresa){
    var informacoesEmpresa = fs.readFileSync(`${caminhoRaiz}//${cidade}//${empresa}//dados.json`);

    return JSON.parse(informacoesEmpresa).desligamentos;
}

const listarEmpresas = function(cidade){
    var list = fs.readdirSync(`${caminhoRaiz}//${cidade}`);

    return list;
}

const listarCidades = function(){
    var list = fs.readdirSync(`${caminhoRaiz}`);

    return list;
}

const obterLegenda = function() {
    var informacoesLegenda = fs.readFileSync(`${caminhoRaiz}..//legenda.json`);

    return JSON.parse(informacoesLegenda);
}

app.get('/funcionarios/cidade/:cidade/empresa/:empresa', function(req, res) {
    const objetoARetornar = listarFuncionarios(req.params.cidade, req.params.empresa);
    console.log(objetoARetornar)
    res.send(objetoARetornar);
});

app.get('/empresas/cidade/:cidade', function(req, res) {
    const objetoARetornar = listarEmpresas(req.params.cidade);
    console.log(objetoARetornar)
    res.send(objetoARetornar);
});

app.get('/cidades', function(req, res) {
    const objetoARetornar = listarCidades();
    console.log(objetoARetornar)
    res.send(objetoARetornar);
});

app.get('/legenda', function(req, res) {
    const objetoARetornar = obterLegenda();
    console.log(objetoARetornar)
    res.send(objetoARetornar);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/', express.static(__dirname + '/page'));
app.use(express.static(__dirname + '/page'));

// app.get('/', (req, res) => {
//     console.log(__dirname);
//     res.sendFile(path.resolve(__dirname, 'page/', 'index.html'));
// });

app.listen(3000, function () {
  console.log('Local server listening on port 3000!');
});