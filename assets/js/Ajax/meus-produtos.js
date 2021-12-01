$(function(){
    var token = sessionStorage.getItem("token");
    var idPedidos = [];
    
    $.ajax({
        url: 'https://localhost:44392/api/PedidoVenda/',
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (result) {
            result.map(result => {
                idPedidos.push(result.id);
            });
        },
        error: function (err) {
            console.log(err);
        },
        complete: function(){
            idPedidos.forEach(percorrerIdPedidos);
        }
    });

    function percorrerIdPedidos(element) {
        console.log(element)
    };

    $("#finalizarCarrinho").click(function(e){
        e.preventDefault();
        sessionStorage.setItem("valorTotalPedido", $(".valorTotal").text());
        location.href = "confirmar-endereco.html";
    });

    function mostrarCarrinho(result){
        var valorTotal = 0;

        for (i in result) {
            console.log(result);
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