$(function(){
    var token = sessionStorage.getItem("token");
    var idPedidos = [];
    
    $.ajax({
        url: 'https://localhost:44392/api/voucher/pedidovendavoucher',
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (result) {
            mostrarCarrinho(result);
        },
        error: function (err) {
            if (err.status == 500)
                        location.href = "login.html";
                    else
                        console.log(err);
        }
    });

    function mostrarCarrinho(result){
        var valorTotal = 0;
        console.log(result)

        for (i in result) {
            let dataPedido = result[i].dataPedidovenda;
            let split2 = dataPedido.split('T'); //separa a data da hora
            let sp2 = split2[0].split('-');
            let formatarDataPedido = `${sp2[2]}/${sp2[1]}/${sp2[0]}`;

            $(".tabelaCarrinho tbody").append(`
                <tr>
                    <td width="200px"></td>
                    <td width="130px">
                        <img src="./assets/images/vouchers/v${result[i].idVoucher}.png" alt="">
                    </td>
                    <td width="200px">
                        Voucher 0${result[i].idVoucher}<br>
                        <span>Valor: </span> 
                        <span>${result[i].valorFinal.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</span><br>
                        <span>Data da compra:<br>${formatarDataPedido}</span><br>
                    </td>
                    <td>
                        <span>Forma de pagamento: ${result[i].condicaopagamento = 'boleto'? 'Boleto':"Cartão / Débito"}</span><br>
                        <span>Validado: ${result[i].validado == 'VALIDADO' ? "SIM" : "NÃO"}<br>
                        <span>Número para validar: ${result[i].validado == 'VALIDADO' ? "" : result[i].validado}
                    </td>
                    <td width="200px"></td>
                </tr>
            `);
            valorTotal += result[i].preco
        }
        $(".valorTotal").html(valorTotal.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));
    }
});