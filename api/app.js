var express = require('express');
const fs = require('fs');
var app = express();
const caminhoRaiz = "../dados/";

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

app.listen(3000, function () {
  console.log('Local server listening on port 3000!');
});