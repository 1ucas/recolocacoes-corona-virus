$(document).ready(function () {

    // Sim pessoal, a programação é em Português porque o objetivo neste momento é sermos o mais inclusivos possível.

    carregarTodosDados()

});

function carregarTodosDados() {

    $.getJSON("http://localhost:3000/dados", function(result){
        exibirAlertaSucesso()
    })
    .fail(function() {
        exibirAlertaError()
    })

    
}

function exibirAlertaSucesso() {
    $("#alerta-sucesso").show()
}

function exibirAlertaError() {
    $("#alerta-erro").show()
}