$(function () {
    var token = sessionStorage.getItem('token');
    var idCliente = sessionStorage.getItem('idCliente');
    var formaPag = sessionStorage.getItem('formaPagamento');
    var valorTotal = sessionStorage.getItem('valorTotalPedido');
    var voucherComprado = JSON.parse(sessionStorage.getItem('voucher'));
    var date = new Date();
    var dataEntrega = new Date(date.setDate(date.getDate() + 5));
    var itensPedido = [];

    $.ajax({
        url: 'https://localhost:44392/api/Carrinho/',
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (result) {
            mostrarCarrinho(result);
        },
        error: function (err) {
            if (err.status == 401)
                location.href = "login.html";
        }
    });

    $("#finalCompra").click(function (e) {
        e.preventDefault();

        if (voucherComprado == null || voucherComprado == "") {
            var pedido = {
                idCliente: parseInt(idCliente),
                dataPedidovenda: new Date(),
                dataEntregavenda: dataEntrega,
                situacaoPedidovenda: formaPag == "cartaoDebito" ? "CONCLUIDO" : "Pendente",
                condicaoPagamento: formaPag,
                valorFinal: parseFloat(valorTotal.replace('R$', '').replace('.', ''))
            };

            $.ajax({
                url: 'https://localhost:44392/api/PedidoVenda',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(pedido),
                success: function (result) {
                    gravarItens();
                },
                error: function (err) {
                    if (err.status == 401)
                        location.href = "login.html";
                    else
                        console.log(err);
                }
            });
        } else {
            var pedidoVoucher = {
                idVoucher: voucherComprado[0].id,
                idCliente: parseInt(idCliente),
                dataPedidovenda: new Date(),
                situacaoPedidovenda: formaPag == "cartaoDebito" ? "CONCLUIDO" : "Pendente",
                condicaoPagamento: formaPag,
                valorFinal: parseFloat(valorTotal.replace('R$', '').replace('.', ''))
            };

            $.ajax({
                url: 'https://localhost:44392/api/Voucher/pedidovenda',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(pedidoVoucher),
                error: function (err) {
                    if (err.status == 401)
                        location.href = "login.html";
                    else
                        console.log(err);
                }
            });
            location.href = "compra-finalizada.html";
        };
    });

    function gravarItens() {
        itensPedido.map(res => {
            var itens = {
                idProduto: res.idProduto,
                qtde: res.qtde,
                preco: res.valor
            };

            $.ajax({
                url: 'https://localhost:44392/api/PedidoVenda/itens',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(itens),
                success: function (result) {
                },
                error: function (err) {
                    if (err.status == 401)
                        location.href = "login.html";
                    else
                        console.log(err);
                },
                complete: function () {
                }
            });
            apagarCarrinho(res.idCarrinho);
        });
        location.href = 'compra-finalizada.html';
    }

    if (voucherComprado == null || voucherComprado == "") {
        $.ajax({
            url: 'https://localhost:44392/api/Cliente/' + idCliente,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) {
                $(".cep").html(result.endereco.cep.substring(0, 5) + "-" + result.endereco.cep.substring(6, 3));
                $(".logradouro").html(result.endereco.logradouro);
                $(".numero").html(result.endereco.numero);
                $(".complemento").show().html(result.endereco.complemento);
                $(".bairro").html(result.endereco.bairro);
                $(".cidade").html(result.endereco.cidade);
                $(".estado").html(result.endereco.uf);
            },
            error: function (err) {
                console.log(err);
            }
        });
    } else {
        $(".dataEntregaProduto").hide();
    }

    $(".dataEntrega").html(date.toLocaleString('pt-BR'));

    function apagarCarrinho(data) {
        $.ajax({
            url: 'https://localhost:44392/api/Carrinho/' + data,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) {
                console.log(result);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };

    function mostrarCarrinho(result) {
        if (voucherComprado != null && voucherComprado != "") {
            console.log(voucherComprado[0]);
            $(".produtosCompra").append(`
                <input type="hidden" class="idVoucher" value="${voucherComprado[0].id}" />
                <div class="infoResumo">
                    <div class="imgFotoResumo">
                        <img width="10000px" src="./assets/images/vouchers/${voucherComprado[0].caminhoFoto}" alt=""><br>
                        <h3 style="margin-left: 416px">Voucher plano ${voucherComprado[0].id}<h3>
                    </div><br><br><br>
                </div><br>
            `);
            valorTotal = voucherComprado[0].preco;
        } else {

            var valorTotal = 0;
            var numeroCartao = sessionStorage.getItem('numeroCartao');
            var formaPag = sessionStorage.getItem('formaPagamento');
            var parcela = sessionStorage.getItem('parcela');


            for (i in result) {
                $(".produtosCompra").append(`
                    <input type="hidden" class="idProduto" value="${result[i].idProduto}" />
                    <input type="hidden" class="idCarrinho" value="${result[i].id}" />
                    <div class="infoResumo">
                        <div class="imgFotoResumo">
                            <img width="100px" src="./assets/images/produtos/${result[i].produto.caminhoFoto}" alt="">
                        </div>
                        <div class="divInfoResumo">
                            <span>${result[i].produto.descricao}</span><br>
                            <span>Quantidade: ${result[i].qtde}</span><br>
                            <span class="new__price">Valor: ${result[i].preco.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' })}</span>
                        </div> 
                    </div><br>
                `);
                valorTotal += result[i].preco
                itensPedido.push({ idCarrinho: result[i].id, idProduto: result[i].idProduto, qtde: result[i].qtde, valor: result[i].preco });
            }
        }

        parcela = parcela + 'x de ' + (valorTotal / parcela).toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' });
        numeroCartao != null ? numeroCartao = '**********' + numeroCartao.substring(15) : null;
        formaPag = formaPag == 'debitoCredito' ? 'Débito / Crédito' : 'Boleto';

        if (formaPag == 'Boleto') {
            $(".numeroCartao").hide();
            $(".parcela").hide();
        } else {
            $(".numCartao").html(numeroCartao);
            $(".parcelado").html(parcela);
        }
        $(".formaPag").html(formaPag);
        console.log(valorTotal);
        $(".valorTotal").html(valorTotal.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' }));
    }
});