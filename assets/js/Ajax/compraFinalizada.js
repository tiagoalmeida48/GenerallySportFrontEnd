$(function(){
    var formaPag = sessionStorage.getItem('formaPagamento');

    if (formaPag == 'creditoDebito'){
        $(".resultCompra").html(`
            <h1>Compra realizada com sucesso</h1>
            <img src='./assets/images/certo.png' />        
        `);
    } else {
        $(".resultCompra").html(`
            <h1>Compra realizada com sucesso</h1>
            <h3 class='infoBoleto'>Aguardando pagamento para liberação de compra, você terá um prazo de 10 dias para pagar, após esse prazo a compra é cancelada automaticamente!</h3>        
        `);
    }
    sessionStorage.removeItem('valorTotalPedido');
    sessionStorage.removeItem('formaPagamento');
});