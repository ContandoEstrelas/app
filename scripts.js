function calcularValorHora(salario, horasPorDia, diasPorSemana) {
    return (salario / (horasPorDia * (diasPorSemana * 4))).toFixed(2);
}

function calcularValorProduto(valorHora, tempoProducao, custoMaterial, taxaMarketplace) {
    return ((valorHora * tempoProducao / 60) + parseFloat(custoMaterial)) * (1 + parseFloat(taxaMarketplace)) * 1.03;
}


function calcularValorHora(salario, horasPorDia, diasPorSemana) {
    if (isNaN(salario) || isNaN(horasPorDia) || isNaN(diasPorSemana) || 
        horasPorDia <= 0 || diasPorSemana <= 0) {
        return "0,00";
    }
    return (salario / (horasPorDia * (diasPorSemana * 4))).toFixed(2);
}



function atualizarValorHora() {
    // Obtém os valores dos elementos de entrada, substituindo vírgulas por pontos
    const salarioAtual = parseFloat($('#salario-atual').val().replace(",", "."));
    const horasDiaAtual = parseFloat($('#horas-dia-atual').val());
    const diasSemanaAtual = parseFloat($('#dias-semana-atual').val());
    // Calcula o valor da hora atual usando a função calcularValorHora
    const valorHoraAtual = calcularValorHora(salarioAtual, horasDiaAtual, diasSemanaAtual).toString().replace(".", ",");
    $('#valor-hora-atual').text(valorHoraAtual);

    // Repete o processo para os valores almejados
    const salarioAlmejado = parseFloat($('#salario-almejado').val().replace(",", "."));
    const horasDiaAlmejado = parseFloat($('#horas-dia-almejado').val());
    const diasSemanaAlmejado = parseFloat($('#dias-semana-almejado').val());
    const valorHoraAlmejado = calcularValorHora(salarioAlmejado, horasDiaAlmejado, diasSemanaAlmejado).toString().replace(".", ",");
    $('#valor-hora-almejado').text(valorHoraAlmejado);
}

function atualizarTempoProducao() {
    const tempoProducao = $('#tempo-producao').val();
    const texto = tempoProducao <= 60 ? tempoProducao + ' minutos' : (tempoProducao / 60).toFixed(2).replace(".", ",") + ' horas';
    $('#tempo-producao-display').text(texto);
}

function atualizarValorProduto() {
    // Obtém os valores dos elementos de entrada, substituindo vírgulas por pontos
    const valorHoraAlmejado = parseFloat($('#valor-hora-almejada-editavel').val().replace(",", "."));
    const tempoProducao = parseFloat($('#tempo-producao').val());
    const custoMaterial = parseFloat($('#custo-material').val().replace(",", "."));
    const taxaMarketplace = parseFloat($("input[name='marketplaceTax']:checked").val());
    // Calcula o valor final do produto usando a função calcularValorProduto
    const valorProdutoFinal = calcularValorProduto(valorHoraAlmejado, tempoProducao, custoMaterial, taxaMarketplace);
    $('#valor-produto-final').text(valorProdutoFinal.toFixed(2).replace(".", ","));
}


$(document).ready(function() {
let currentCardIndex = 0;

function mostrarCard(cardId) {
$('.card').hide();
$('#' + cardId).show();
}

function nextCard() {
const cards = ['vida-atual', 'valor-atual-hora', 'vida-almejada', 'valor-desejada-hora', 'valor-produto', 'calculo-produto'];
currentCardIndex = Math.min(cards.length - 1, currentCardIndex + 1);

if (cards[currentCardIndex] === 'valor-produto') {
$('#valor-hora-almejada-editavel').val($('#valor-hora-almejado').text());
}

mostrarCard(cards[currentCardIndex]);
}


function prevCard() {
const cards = ['vida-atual', 'valor-atual-hora', 'vida-almejada', 'valor-desejada-hora', 'valor-produto', 'calculo-produto'];
currentCardIndex = Math.max(0, currentCardIndex - 1);
mostrarCard(cards[currentCardIndex]);
}

$('#prosseguir, #avancar, #prosseguir-calculo').click(function() {
nextCard();
});

$('#voltar').click(function() {
prevCard();
});

$('#calcular-vida-atual, #calcular-vida-almejada').click(() => {
atualizarValorHora();
nextCard();
});

$('#calcular').click(() => {
atualizarValorProduto();
nextCard();
});

$('#tempo-producao').on('input', function() {
atualizarTempoProducao();
var x = $(this).val();
var colorStop = x / $(this).attr('max');
$(this).css('--x', colorStop * 100 + '%');
}).trigger('input');

mostrarCard('vida-atual');

$('#home-btn').click(function() {
    currentCardIndex = 0;
    mostrarCard('vida-atual'); // Assume que 'vida-atual' é o primeiro card
});
});
