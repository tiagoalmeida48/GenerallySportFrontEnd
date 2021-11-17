$(function () {
    $.ajax({
        url: 'https://localhost:44392/api/Produto',
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            mostrarProdutos(result);
        },
        error: function (err) {
            console.log(err.responseText);
        },
        complete: function () {
            console.log("Finalizado")
        }
    });

    $("#campoPesquisar").click(function(e){
        e.preventDefault();
        $(".inputPesquisar").toggle();
    });

    $(".inputPesquisar").keydown(function(e){
        console.log(e.target.value != null ? 'https://localhost:44392/api/Produto/nome/' + e.target.value: 'https://localhost:44392/api/Produto/');
        $.ajax({
            url: e.target.value != '' ? 'https://localhost:44392/api/Produto/nome/' + e.target.value: 'https://localhost:44392/api/Produto/',
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $(".produtos").html("");
                mostrarProdutos(result);
            },
            error: function (err) {
                console.log(err.responseText);
            },
            complete: function () {
                console.log("Finalizado")
            }
        });
    });

    function mostrarProdutos(result) {
        for (i in result) {
            $(".produtos").append(`
                <div class="product">
                    <div class="product__header">
                        <img src="./assets/images/produtos/${result[i].caminhoFoto}" alt="product">
                    </div>
                    <div class="product__footer">
                        <h3>${result[i].nome}</h3>
                        <div class="rating">
                            <svg>
                                <use xlink:href="./assets/images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                                <use xlink:href="./assets/images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                                <use xlink:href="./assets/images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                                <use xlink:href="./assets/images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                                <use xlink:href="./assets/images/sprite.svg#icon-star-full"></use>
                            </svg>
                        </div>
                        <div class="product__price">
                            <h4>${result[i].precoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</h4>
                        </div>
                            <a href="/produto.html?id=${result[i].id}"><button type="submit" class="product__btn">CONHEÇA</button></a>
                    </div>
                </div>
          `);
        }
    }
});