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
        
        preencherListaCidades(resultadoCidadesMock)
        preencherListaEmpresas(resultadoEmpresasMock)

        $(".item-cidade").on('click' , function(item){
            $("#lbl-cidade-escolhida").text(item.target.innerText);
        });

        $(".item-empresa").on('click' , function(item){
            $("#lbl-empresa-escolhida").text(item.target.innerText);
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

function exibirAlertaSucesso() {
    $("#alerta-sucesso").show()
}

function exibirAlertaError() {
    $("#alerta-erro").show()
}