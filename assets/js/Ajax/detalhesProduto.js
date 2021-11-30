$(function () {
    var url = new URL(window.location.href);
    var id = url.searchParams.get('id');
    var qtdeProduto = parseInt($(".counter-btn").val());
    var precoAtualizado = 0;
    var precoUnitario = 0;
    var qtdeEstoque = 0;
    var token = sessionStorage.getItem('token');

    $(".minus-btn").click(function () {
        if (qtdeProduto > 1) {
            qtdeProduto -= 1;
            var precoAtualizadoVenda = qtdeProduto * precoAtualizado;
            $(".counter-btn").val(qtdeProduto);
            $("#precoDetalhesProduto").html(precoAtualizadoVenda.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' }));
        } else {
            $(".modal-body").html('Quantidade minima é de 1 item');
            $(".modal").modal('show');
        }
    });

    $(".plus-btn").click(function () {
        if (qtdeProduto < qtdeEstoque) {
            qtdeProduto += 1;
            var precoAtualizadoVenda = qtdeProduto * precoAtualizado;
            $(".counter-btn").val(qtdeProduto);
            $("#precoDetalhesProduto").html(precoAtualizadoVenda.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' }));
        } else {
            $(".modal-body").html('Quantidade máxima é de ' + qtdeEstoque + ' items');
            $(".modal").modal('show');
        }
    });

    $.ajax({
        url: 'https://localhost:44392/api/Produto/' + id,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            mostrarProduto(result[0]);
        },
        error: function (err) {
            console.log(err.responseText);
        },
        complete: function () {
            console.log("Finalizado")
        }
    });

    function mostrarProduto(result) {
        qtdeEstoque = result.qtdeEstoqueatual;
        precoAtualizado = result.precoVenda;
        precoUnitario = result.precoVenda;
        descricao = result.descricao;
        nome = result.nome;
        caminhoFoto = result.caminhoFoto;

        if (result.dataValidade != '0001-01-01T00:00:00') {
            let data = result.dataValidade;
            let split = data.split('T'); //separa a data da hora
            let formmated = split[0].split('-');

            $("#dataValidadeDetalhesProduto").html(`Data de Validade: ${formmated[2]}/${formmated[1]}/${formmated[0]}`);
        }

        $("#nomeDetalhesProduto").html(result.descricao);
        $("#produtoTopLinha, #tipoDestaquesProduto").html(result.nome);
        $("#imgDetalhesProduto").attr('src', './assets/images/produtos/' + result.caminhoFoto)
        $("#precoDetalhesProduto").html(result.precoVenda.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' }));

        if (qtdeEstoque > 0){
            $("#estoqueDetalhesProduto").html('Total de (' + qtdeEstoque + ' items)');
            $(".product-details__btn").show();
        } else {
            $("#estoqueDetalhesProduto").html("<b style='color: red'>PRODUTO INDISPONÍVEL</b>");
            $(".product-details__btn").hide();
        }
    }

    $(".addCarrinho").click(function (e) {
        e.preventDefault();
        if (token == null)
            location.href = 'login.html';
        else {
            var preco = $("#precoDetalhesProduto").text().split("R$");
            carrinho = {
                "idProduto": parseInt(id),
                "qtde": parseInt($(".counter-btn").val()),
                "preco": parseFloat(preco[1].replace('.', ''))
            };
            
            $.ajax({
                url: 'https://localhost:44392/api/Carrinho/',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(carrinho),
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    //console.log("Finalizado")
                }
            });
            location.href = 'carrinho.html';
        }
    });

    $(".finalizarCompra").click(function (e) {
        e.preventDefault();
        if (token == null)
            location.href = 'login.html';
        else {
            var preco = $("#precoDetalhesProduto").text().split("R$");
            carrinho = {
                "idProduto": parseInt(id),
                "qtde": parseInt($(".counter-btn").val()),
                "preco": parseFloat(preco[1].replace('.', ''))
            };

            sessionStorage.setItem('valorTotalPedido', parseFloat(preco[1].replace('.', '')));
            
            $.ajax({
                url: 'https://localhost:44392/api/Carrinho/',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(carrinho),
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    //console.log("Finalizado")
                }
            });
            location.href = 'confirmar-endereco.html';
        }
    });
});