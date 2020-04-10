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

        let legendaCargoMock = {
            "DE-2-0" : "Desenvolvedor Frontend Mock",
            "AQ-1-1" : "Arquiteto Backend Mock"
        }
        
        preencherListaCidades(resultadoCidadesMock)
        preencherListaEmpresas(resultadoEmpresasMock)
        preencherTabelaFuncionarios(resultadoFuncionariosMock, legendaCargoMock)

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

function preencherTabelaFuncionarios(resultado, legendaCargo) {
    $("#tabela-profissionais tbody").empty()
    for (i = 0; i < resultado.length; i++) {
        var tr = document.createElement('TR');
        let funcionario = resultado[i];
        
        var tdNome = document.createElement('TD');
        tdNome.appendChild(document.createTextNode(funcionario.nome));
        tr.appendChild(tdNome);

        var funcao = converterCargo(legendaCargo, funcionario.posicao)
        var tdPosicao = document.createElement('TD');
        tdPosicao.appendChild(document.createTextNode(funcao));
        tr.appendChild(tdPosicao);

        var senioridade = converterSenioridade(funcionario.senioridade);
        var tdSenioridade = document.createElement('TD');
        tdSenioridade.appendChild(document.createTextNode(senioridade));
        tr.appendChild(tdSenioridade);

        var lideraEquipe = funcionario.lidera_equipe ? "SIM" : "NÃO";
        var tdLideraEquipe = document.createElement('TD');
        tdLideraEquipe.appendChild(document.createTextNode(lideraEquipe));
        tr.appendChild(tdLideraEquipe);

        var tdLinkedin = document.createElement('TD');
        var anchorLinkedin = document.createElement('a');
        anchorLinkedin.appendChild(document.createTextNode(funcionario.link));
        anchorLinkedin.href = funcionario.link;
        anchorLinkedin.target = "_blank";
        anchorLinkedin.rel = "noopener noreferrer";
        tdLinkedin.appendChild(anchorLinkedin);
        tr.appendChild(tdLinkedin);
        
        $("#tabela-profissionais tbody").append(tr);
    }
}

function converterCargo(legendaCargo, cargo) {
    var funcao = "N/A"
    Object.keys(legendaCargo).forEach(key => {
        if(key == cargo) {
            funcao = legendaCargo[key];
        }
    })
    return funcao;
}

function converterSenioridade(senioridade){
    switch (senioridade) {
        case 1:
            return "JUNIOR"
            break;
        case 2:
            return "PLENO"
            break;
        case 3:
            return "SENIOR"
            break;
        case 4:
            return "MASTER / ESPECIALISTA"
            break;
        default:
            return " - ";
            break;
    }
}

function exibirAlertaSucesso() {
    $("#alerta-sucesso").show()
}

function exibirAlertaError() {
    $("#alerta-erro").show()
}