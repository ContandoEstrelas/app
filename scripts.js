function calcularValorHora(salario, horasPorDia, diasPorSemana) {
    return (salario / (horasPorDia * (diasPorSemana * 4))).toFixed(2);
}

function calcularValorProduto(valorHora, tempoProducao, custoMaterial, taxaMarketplace) {
    return ((valorHora * tempoProducao / 60) + parseFloat(custoMaterial)) * (1 + parseFloat(taxaMarketplace)) * 1.03;
}

function atualizarValorHora() {
    const salarioAtual = $('#salario-atual').val().replace(",", ".");
    const horasDiaAtual = $('#horas-dia-atual').val();
    const diasSemanaAtual = $('#dias-semana-atual').val();
    const valorHoraAtual = calcularValorHora(salarioAtual, horasDiaAtual, diasSemanaAtual);
    $('#valor-hora-atual').text(valorHoraAtual.replace(".", ","));

    const salarioAlmejado = $('#salario-almejado').val().replace(",", ".");
    const horasDiaAlmejado = $('#horas-dia-almejado').val();
    const diasSemanaAlmejado = $('#dias-semana-almejado').val();
    const valorHoraAlmejado = calcularValorHora(salarioAlmejado, horasDiaAlmejado, diasSemanaAlmejado);
    $('#valor-hora-almejado').text(valorHoraAlmejado.replace(".", ","));
}

function atualizarTempoProducao() {
    const tempoProducao = $('#tempo-producao').val();
    const texto = tempoProducao <= 60 ? tempoProducao + ' minutos' : (tempoProducao / 60).toFixed(2).replace(".", ",") + ' horas';
    $('#tempo-producao-display').text(texto);
}

function atualizarValorProduto() {
    const valorHoraAlmejado = $('#valor-hora-almejada-editavel').val().replace(",", ".");
    const tempoProducao = $('#tempo-producao').val();
    const custoMaterial = $('#custo-material').val().replace(",", ".");
    const taxaMarketplace = $("input[name='marketplaceTax']:checked").val();
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

$('#prosseguir, #prosseguir-calculo').click(function() {
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
    mostrarCard(cards[currentCardIndex]);
});
});
