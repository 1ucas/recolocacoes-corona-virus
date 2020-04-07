var express = require('express');
var app = express();

app.get('/cidades', function(req, res) {
    let resposta = {
        "cidades": ["Belo Horizonte", "São Paulo"]
    }
    res.json(resposta);
});

app.get('/cidades/:cidade/empresas/:empresa', function(req, res) {
    console.log('Request Cidade:', req.params.cidade);
    console.log('Request Empresa:', req.params.empresa);
    res.send('About this wiki');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});