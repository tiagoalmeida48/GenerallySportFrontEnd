$(function () {
    $.ajax({
        url: 'https://localhost:44392/api/Voucher',
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
        }
    });

    function mostrarProdutos(result) {
        for (i in result) {
            $(".vouchers-card").append(`
            <div class="new__card">
                <div class="card__header">
                    <img src="./assets/images/vouchers/${result[i].caminhoFoto}" alt="">
                </div>
                <div class="card__footer">
                    <h3>Adquira seu Voucher !!</h3>
                    <a href="/detalhes-vouchers/${result[i].id}">
                        <button>Saiba mais.</button>
                    </a>
                </div>
          `);
        }
    }
});