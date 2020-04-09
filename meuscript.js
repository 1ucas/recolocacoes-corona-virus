$(document).ready(function () {

    // Sim pessoal, a programação é em Português porque o objetivo neste momento é sermos o mais inclusivos possível.
    carregarTodosDados()

});

function carregarTodosDados() {

    $.getJSON("http://localhost:3000/dados", function(resultado){

        exibirAlertaSucesso()

    })
    .fail(function() {
        let resultadoCidadesMock = [{
            "nome" : "Belo Horizonte"
        },{
            "nome" : "São Paulo"
        }]

        let resultadoEmpresasMock = [{
            "nome" : "Empresa X"
        },{
            "nome" : "Empresa Y"
        }]

        let resultadoFuncionariosMock = [{
            "nome": "Joao Exemplo",
            "posicao": "DE-2-0",
            "senioridade": 2,
            "lidera_equipe" : true,
            "link": "https://www.linkedin.com/in/lucas-ramos-maciel/"
        },{
            "nome": "Lucas Exemplo",
            "posicao": "AQ-1-1",
            "senioridade": 2,
            "lidera_equipe" : false,
            "link": "https://www.linkedin.com/in/lucas-ramos-maciel/"
        }]
        
        preencherListaCidades(resultadoCidadesMock)
        preencherListaEmpresas(resultadoEmpresasMock)
        preencherTabelaFuncionarios(resultadoFuncionariosMock)

        $(".item-cidade").on('click' , function(item){
            $("#lbl-cidade-escolhida").text(item.target.innerText);
            $("#lbl-empresa-escolhida").text("");
            $("#tabela-profissionais").hide()
        });

        $(".item-empresa").on('click' , function(item){
            $("#lbl-empresa-escolhida").text(item.target.innerText);
            $("#tabela-profissionais").show()
        });

        exibirAlertaError()
    })
}

function preencherListaCidades(resultado) {
    var markup = "";

    for (var i = 0; i < resultado.length; i++) {
        markup += '<a class="dropdown-item item-cidade" href="#">' + resultado[i].nome + '</a>';
    }

    //Populate dropdown with value
    $("#lista-cidades").html(markup)
}

function preencherListaEmpresas(resultado) {
    var markup = "";

    for (var i = 0; i < resultado.length; i++) {
        markup += '<button class="dropdown-item item-empresa">' + resultado[i].nome + '</a>';
    }

    //Populate dropdown with value
    $("#lista-empresas").html(markup)
}

function preencherTabelaFuncionarios(resultado) {
    $("#tabela-profissionais tbody").empty()
    for (i = 0; i < resultado.length; i++) {
        var tr = document.createElement('TR');
        let funcionario = resultado[i];
        
        var tdNome = document.createElement('TD')
        tdNome.appendChild(document.createTextNode(funcionario.nome));
        tr.appendChild(tdNome)

        var tdPosicao = document.createElement('TD')
        tdPosicao.appendChild(document.createTextNode(funcionario.posicao));
        tr.appendChild(tdPosicao)

        var tdSenioridade = document.createElement('TD')
        tdSenioridade.appendChild(document.createTextNode(funcionario.senioridade));
        tr.appendChild(tdSenioridade)

        var tdLideraEquipe = document.createElement('TD')
        tdLideraEquipe.appendChild(document.createTextNode(funcionario.lidera_equipe));
        tr.appendChild(tdLideraEquipe)

        var tdLinkedin = document.createElement('TD')
        tdLinkedin.appendChild(document.createTextNode(funcionario.link));
        tr.appendChild(tdLinkedin)
        
        $("#tabela-profissionais tbody").append(tr);
    }
}

function exibirAlertaSucesso() {
    $("#alerta-sucesso").show()
}

function exibirAlertaError() {
    $("#alerta-erro").show()
}