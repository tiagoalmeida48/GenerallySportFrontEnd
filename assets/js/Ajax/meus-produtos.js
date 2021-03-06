$(function(){
    var token = sessionStorage.getItem("token");
    var idPedidos = [];
    
    $.ajax({
        url: 'https://localhost:44392/api/pedidovenda/itenspedido/',
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

        for (i in result) {
            let dataEntrega = result[i].pedidoVenda.dataEntregavenda;
            let dataPedido = result[i].pedidoVenda.dataPedidovenda;
            let split1 = dataEntrega.split('T'); //separa a data da hora
            let split2 = dataPedido.split('T'); //separa a data da hora
            let sp1 = split1[0].split('-');
            let sp2 = split2[0].split('-');
            let formatarDataEntrega = `${sp1[2]}/${sp1[1]}/${sp1[0]}`;
            let formatarDataPedido = `${sp2[2]}/${sp2[1]}/${sp2[0]}`;

            $(".tabelaCarrinho tbody").append(`
                <tr>
                    <td width="200px"></td>
                    <td width="130px">
                        <img src="./assets/images/produtos/${result[i].produto.caminhoFoto}" alt="">
                    </td>
                    <td width="200px">
                        Produto: ${result[i].produto.descricao}<br>
                        <span>Valor total: </span> 
                        <span>${result[i].pedidoVenda.valorFinal.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</span><br>
                        <span>Quantidade comprada: </span>
                        <span>${result[i].qtde}</span><br>
                    </td>
                    <td>
                        <span>Forma de pagamento: ${result[i].pedidoVenda.condicaoPagamento}</span><br>
                        <span>Data da compra: ${formatarDataPedido}</span><br>
                        <span>Data da Entrega: ${formatarDataEntrega}</span><br>
                        
                    </td>
                    <td width="200px"></td>
                </tr>
            `);
            valorTotal += result[i].preco
        }
        $(".valorTotal").html(valorTotal.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));
    }
});