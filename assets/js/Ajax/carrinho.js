$(function(){
    var token = localStorage.getItem("token");
    var qtdeCarrinho = parseInt( $(".counter-btn").val());
    var precoAtualizado = 0;
    var precoUnitario = 0;
    var qtdeEstoque = 0;

    //console.log("Qtde: " + $(".counter-btn").val())
    $(".minus-btn").click(function(e){
        e.preventDefault(); 
        alert("ok");  
    });    
    
    // $.ajax({
    //     url: 'https://localhost:44392/api/Carrinho/',
    //     type: "GET",
    //     dataType: "json",
    //     contentType: "application/json; charset=utf-8",
    //     headers: { 'Authorization': 'Bearer ' + token },
    //     success: function (result) {
    //         mostrarCarrinho(result);
    //     },
    //     error: function (err) {
    //         console.log(err);
    //     },
    //     complete: function () {
    //         console.log("Finalizado")
    //     }
    // });
    
    // function mostrarCarrinho(result){
    //     for (i in result) {
    //         $(".tabelaCarrinho tbody").append(`
    //             <tr>
    //                 <td class="product__thumbnail">
    //                     <a href="#">
    //                         <img src="./assets/images/produtos/${result[i].produto.caminhoFoto}" alt="">
    //                     </a>
    //                 </td>
    //                 <td class="product__name">
    //                     <span id='idProduto'>${result[i].produto.idProduto}</span>
    //                     <a href="#">${result[i].produto.descricao}</a>
    //                     <br><br>
    //                     <small>${result[i].produto.nome}</small>
    //                 </td>
    //                 <td class="product__price">
    //                     <div class="price">
    //                         <span class="new__price">${result[i].produto.precoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</span>
    //                     </div>
    //                 </td>
    //                 <td class="product__quantity">
    //                     <div class="input-counter">
    //                         <div>
    //                             <span class="minus-btn">
    //                                 <svg>
    //                                 <use
    //                                     xlink:href="./assets/images/sprite.svg#icon-minus"></use>
    //                                 </svg>
    //                             </span>
    //                             <input type="text" min="1" value="${result[i].qtde}" max="10"
    //                                 class="counter-btn" readOnly>
    //                             <span class="plus-btn">
    //                                 <svg>
    //                                 <use
    //                                     xlink:href="./assets/images/sprite.svg#icon-plus"></use>
    //                                 </svg>
    //                             </span>
    //                         </div>
    //                     </div>
    //                 </td>
    //                 <td class="product__subtotal">
    //                     <div class="price">
    //                         <span class="new__price">${result[i].preco.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})}</span>
    //                     </div>
    //                     <a href="#" class="remove__cart-item">
    //                         <svg>
    //                         <use
    //                             xlink:href="./assets/images/sprite.svg#icon-trash"></use>
    //                         </svg>
    //                     </a>
    //                 </td>
    //             </tr>
    //         `);
    //     }
    // }
});
        // if(qtdeCarrinho > 1){
        //     qtdeCarrinho -= 1;
        //     var precoAtualizadoVenda = qtdeCarrinho * precoAtualizado;
        //     $(".counter-btn").val(qtdeCarrinho);
        //     $("#precoDetalhesProduto").html(precoAtualizadoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));

        //     carrinho = {
        //         idProduto: $("#idProduto").text(),
        //         qtde: qtdeCarrinho,
        //         preco: precoAtualizadoVenda
        //     };
        //     console.log(carrinho);

            // $.ajax({
            //     url: 'https://localhost:44392/api/Carrinho/',
            //     type: "POST",
            //     dataType: "json",
            //     contentType: "application/json; charset=utf-8",
            //     headers: { 'Authorization': 'Bearer ' + token },
            //     data: JSON.stringify(carrinho),
            //     error: function (err) {
            //         console.log(err);
            //     },
            //     complete: function () {
            //         console.log("Finalizado")
            //     }
            // });

        // } else {
        //     $(".modal-body").html('Quantidade minima é de 1 item');
        //     $(".modal").modal('show');
        // }
    //});

    // $(".plus-btn").click(function(){        
    //     if(qtdeCarrinho < qtdeEstoque){
    //         qtdeCarrinho += 1;
    //         var precoAtualizadoVenda = qtdeCarrinho * precoAtualizado;
    //         $(".counter-btn").val(qtdeCarrinho);
    //         $("#precoDetalhesProduto").html(precoAtualizadoVenda.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}));
    //     } else {
    //         $(".modal-body").html('Quantidade máxima é de ' + qtdeEstoque + ' items');
    //         $(".modal").modal('show');
    //     }
    // });

