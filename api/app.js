var express = require('express');
const fs = require('fs');
var app = express();
const caminhoRaiz = "../dados/";


const obtemConteudoArquivo = function(conteudo){
    const arquivo = JSON.parse(conteudo);
    return arquivo;
}
const leArquivo = function(nomeCidade, nomeEmpresa, nomeArquivo){
    fs.readFileSync(`${caminhoRaiz}${nomeCidade}/${nomeEmpresa}/${nomeArquivo}`, function read(err, conteudoArquivo) {
        if (err) {
            throw err;
        }
        return obtemConteudoArquivo(conteudoArquivo)
    });
}


const leDiretorioEmpresa = function(nomeCidade, nomeEmpresa){
    let objetoEmpresa = {
        nomeEmpresa : []
    }
    fs.readdirSync(`${caminhoRaiz}${nomeCidade}/${nomeEmpresa}`, function (err, arquivos) {
        if (err) {
          console.log(err);
          return;
        }
        for (const arquivo of arquivos) {
            let conteudoArquivo = leArquivo(nomeCidade, nomeEmpresa, arquivo)
            objetoEmpresa.nomeEmpresa.push(conteudoArquivo);
        }
    });
    return objetoEmpresa;
}

const leDiretorioCidade = function(nomeCidade){
    let objetoCidade = {
        nomeCidade : []
    }
    fs.readdirSync(`${caminhoRaiz}${nomeCidade}`, function (err, empresas) {
        if (err) {
          console.log(err);
          return;
        }
        for (const empresa of empresas) {
            let conteudoEmpresa = leDiretorioEmpresa(nomeCidade ,empresa)
            objetoCidade.nomeCidade.push(conteudoEmpresa);
        }
    });

    return objetoCidade;
}

const leDiretorioDados = function(){
    let objetoCompleto = {
        cidades : []
    };
    
    fs.readdirSync(`${caminhoRaiz}`, function (err, cidades) {
        if (err) {
          console.log(err);
          return;
        }
        for (const cidade of cidades) {
            let conteudoCidade = leDiretorioCidade(cidade)
            objetoCompleto.cidades.push(conteudoCidade);
        }
    });

    return objetoCompleto;
}

app.get('/cidades', function(req, res) {
    const objetoARetornar = leDiretorioDados();
    console.log(objetoARetornar)
    res.send(objetoARetornar);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});