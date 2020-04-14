$(document).ready(function () {

    // Sim pessoal, a programação é em Português porque o objetivo neste momento é sermos o mais inclusivos possível.
    carregarCidades();
    carregarLegenda();
    tratarBotaoBusca();
});

var legenda = {}

function tratarBotaoBusca() {
    if ($("#lbl-empresa-escolhida").text() != "" && $("#lbl-cidade-escolhida").text() != "") {
        initSearch();
        $("#search-button").prop("disabled", false);
    }
    else
        $("#search-button").prop("disabled", true);
}

function initSearch() {
    $("#search-button").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tabela-profissionais-tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function carregarLegenda() {
    $.getJSON("/legenda", function (resultado) {

        legenda = resultado;

    })
        .fail(function () {
            exibirAlertaError()
        })
}

function carregarCidades() {

    $.getJSON("/cidades", function (resultado) {

        preencherListaCidades(resultado)

        $(".item-cidade").on('click', function (item) {
            $("#lbl-cidade-escolhida").text(item.target.innerText);
            $("#lbl-empresa-escolhida").text("");
            tratarBotaoBusca();
            $("#tabela-profissionais").hide();
            carregarEmpresasPorCidade(item.target.innerText);
        });

    })
        .fail(function () {
            exibirAlertaError()
        })
}

function carregarEmpresasPorCidade(cidade) {
    let url = "/empresas/cidade/{cidade}";
    let urlFormatada = url.replace("{cidade}", cidade);
    $.getJSON(urlFormatada, function (resultado) {

        preencherListaEmpresas(resultado)

        $(".item-empresa").on('click', function (item) {
            $("#lbl-empresa-escolhida").text(item.target.innerText);
            tratarBotaoBusca();
            carregarFuncionariosPorEmpresa(cidade, item.target.innerText);
        });

    })
        .fail(function () {
            exibirAlertaError()
        })
}

function carregarFuncionariosPorEmpresa(cidade, empresa) {
    let url = "/funcionarios/cidade/{cidade}/empresa/{empresa}"
    let urlFormatada = url.replace("{cidade}", cidade).replace("{empresa}", empresa);
    $.getJSON(urlFormatada, function (resultado) {

        preencherTabelaFuncionarios(resultado, legenda);
        $("#tabela-profissionais").show()

    })
        .fail(function () {
            exibirAlertaError()
        })
}

function preencherListaCidades(resultado) {
    var markup = "";

    for (var i = 0; i < resultado.length; i++) {
        markup += '<a class="dropdown-item item-cidade" href="#">' + resultado[i] + '</a>';
    }

    //Populate dropdown with value
    $("#lista-cidades").html(markup)
}

function preencherListaEmpresas(resultado) {
    var markup = "";

    for (var i = 0; i < resultado.length; i++) {
        markup += '<button class="dropdown-item item-empresa">' + resultado[i] + '</a>';
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
        if (key == cargo) {
            funcao = legendaCargo[key];
        }
    })
    return funcao;
}

function converterSenioridade(senioridade) {
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