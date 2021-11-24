$(function(){
    var token = localStorage.getItem("token");
    var qtdeCarrinho;
    var precoAtualizado = 0;
    var idCarrinho = 0;
    var qtdeEstoque = 0;

    $(document).on("click", ".minus-btn", function(){
        qtdeCarrinho = parseInt($(this).parent().find("input").val());
        precoAtualizado = $(this).parents('tr').find('.precoUnitario').text();
        idCarrinho = parseInt($(this).parents('tr').find(".idCarrinho").val());

        if(qtdeCarrinho > 1){
            qtdeCarrinho -= 1;
            var precoAtualizadoVenda = qtdeCarrinho * parseFloat(precoAtualizado.replace('R$', '').replace(',', '.'));
            $(this).parent().find("input").val(qtdeCarrinho);
            $("#precoDetalhesProduto").html(precoAtualizadoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));

            carrinho = {
                id: idCarrinho,
                idProduto: parseInt($(this).parents('tr').find(".idProduto").val()),
                qtde: qtdeCarrinho,
                preco: parseFloat(precoAtualizadoVenda.toFixed(2))
            };

            $.ajax({
                url: 'https://localhost:44392/api/Carrinho/' + idCarrinho,
                type: "PUT",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(carrinho),
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    $.ajax({
                        url: 'https://localhost:44392/api/Carrinho/',
                        type: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        headers: { 'Authorization': 'Bearer ' + token },
                        success: function (result) {
                            $(".tabelaCarrinho tbody").html('');
                            mostrarCarrinho(result);
                        }
                    });
                }
            });

        } else {
            $(".modal-body").html('Quantidade minima é de 1 item');
            $(".modal").modal('show');
        }
    });  
    
    $(document).on("click", ".plus-btn", function(){
        qtdeCarrinho = parseInt($(this).parent().find("input").val());
        precoAtualizado = $(this).parents('tr').find('.precoUnitario').text();
        idCarrinho = parseInt($(this).parents('tr').find(".idCarrinho").val());
        qtdeEstoque = parseInt($(this).parents('tr').find(".qtdeEstoqueAtual").val());

        if(qtdeCarrinho < qtdeEstoque){
            qtdeCarrinho += 1;
            var precoAtualizadoVenda = qtdeCarrinho * parseFloat(precoAtualizado.replace('R$', '').replace(',', '.'));
            $(this).parent().find("input").val(qtdeCarrinho);
            $("#precoDetalhesProduto").html(precoAtualizadoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));

            carrinho = {
                id: idCarrinho,
                idProduto: parseInt($(this).parents('tr').find(".idProduto").val()),
                qtde: qtdeCarrinho,
                preco: parseFloat(precoAtualizadoVenda.toFixed(2))
            };

            $.ajax({
                url: 'https://localhost:44392/api/Carrinho/' + idCarrinho,
                type: "PUT",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: { 'Authorization': 'Bearer ' + token },
                data: JSON.stringify(carrinho),
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    $.ajax({
                        url: 'https://localhost:44392/api/Carrinho/',
                        type: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        headers: { 'Authorization': 'Bearer ' + token },
                        success: function (result) {
                            $(".tabelaCarrinho tbody").html('');
                            mostrarCarrinho(result);
                        }
                    });
                }
            });

        } else {
            $(".modal-body").html('Quantidade máxima é de ' + qtdeEstoque + ' items');
            $(".modal").modal('show');
        }
    }); 
    
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
            console.log(err);
        }
    });
    
    $(document).on("click", ".remove__cart-item", function(){
        idCarrinho = parseInt($(this).parents('tr').find(".idCarrinho").val());
        $.ajax({
            url: 'https://localhost:44392/api/Carrinho/' + idCarrinho,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) {
                console.log(result);
            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
                $.ajax({
                    url: 'https://localhost:44392/api/Carrinho/',
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    headers: { 'Authorization': 'Bearer ' + token },
                    success: function (result) {
                        $(".tabelaCarrinho tbody").html('');
                        mostrarCarrinho(result);
                    }
                });
            }
        });
    });

    function mostrarCarrinho(result){
        var valorTotal = 0;

        for (i in result) {
            $(".tabelaCarrinho tbody").append(`
                <tr>
                    <td class="product__thumbnail">

                        <input type="hidden" class="qtdeEstoqueAtual" value="${result[i].produto.qtdeEstoqueatual}" />
                        <input type="hidden" class="idProduto" value="${result[i].idProduto}" />
                        <input type="hidden" class="idCarrinho" value="${result[i].id}" />
                        <a href="#">
                            <img src="./assets/images/produtos/${result[i].produto.caminhoFoto}" alt="">
                        </a>
                    </td>
                    <td class="product__name">
                        <a href="#">${result[i].produto.descricao}</a>
                        <br><br>
                        <small>${result[i].produto.nome}</small>
                    </td>
                    <td class="product__price">
                        <div class="price">
                            <span class="new__price precoUnitario">${result[i].produto.precoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</span>
                        </div>
                    </td>
                    <td class="product__quantity">
                        <div class="input-counter">
                            <div>
                                <span class="minus-btn">
                                    <svg>
                                    <use
                                        xlink:href="./assets/images/sprite.svg#icon-minus"></use>
                                    </svg>
                                </span>
                                <input type="text" min="1" value="${result[i].qtde}" max="10"
                                    class="counter-btn" readOnly>
                                <span class="plus-btn">
                                    <svg>
                                    <use
                                        xlink:href="./assets/images/sprite.svg#icon-plus"></use>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td class="product__subtotal">
                        <div class="price">
                            <span class="new__price">${result[i].preco.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</span>
                        </div>
                        <a href="#" class="remove__cart-item">
                            <svg>
                            <use
                                xlink:href="./assets/images/sprite.svg#icon-trash"></use>
                            </svg>
                        </a>
                    </td>
                </tr>
            `);
            valorTotal += result[i].preco
        }
        $(".valorTotal").html(valorTotal.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));
    }
});