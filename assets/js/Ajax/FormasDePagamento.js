$(".formaDePagamento").hide();
$("#footer").css('margin-top', '149px');

$(function () {
    var formaDePag = $("#formasPagamento").val();

    if (sessionStorage.getItem('valorTotalPedido') != null && sessionStorage.getItem('valorTotalPedido') != "")
        var valorCompra = parseFloat(sessionStorage.getItem('valorTotalPedido').replace("R$", '').replace('.',''));

    var url = new URL(window.location.href);
    var voucherParam = url.searchParams.get('voucher');

    if (voucherParam != null && voucherParam != "") {
        var voucher = [];
        $.ajax({
            url: 'https://localhost:44392/api/Voucher/' + voucherParam,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result[0] != null && result[0].id != "") {
                    voucher.push({ id: result[0].id, preco: result[0].preco, caminhoFoto: result[0].caminhoFoto })
                    sessionStorage.setItem('voucher', JSON.stringify(voucher));
                    sessionStorage.setItem('valorTotalPedido', result[0].preco);
                    for (let i = 1; i <= 5; i++) {
                        valorCompra = sessionStorage.getItem('valorTotalPedido');
                        let parcela = valorCompra / i;
                        if (i == 1)
                            $("#parcelamento").append(`<option value="${i}">${i}x parcela de ${parcela.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' })}</option>`);
                        else
                            $("#parcelamento").append(`<option value="${i}">${i}x parcelas de ${parcela.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' })}</option>`);

                    }
                } else {
                    sessionStorage.removeItem('voucher');
                    sessionStorage.setItem('valorTotalPedido', "");
                    location.href = "vouchers.html";
                }
            },
            error: function (err) {
                if (err.status == 401)
                        location.href = "login.html";
                    else
                        console.log(err);
            }
        });
    } else {
        for (let i = 1; i <= 5; i++) {
            let parcela = valorCompra / i;
            if (i == 1)
                $("#parcelamento").append(`<option value="${i}">${i}x parcela de ${parcela.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' })}</option>`);
            else
                $("#parcelamento").append(`<option value="${i}">${i}x parcelas de ${parcela.toLocaleString('pt-BR', { style: 'currency', 'currency': 'BRL' })}</option>`);
        }
    }


    $("#formasPagamento").change(function (e) {
        formaDePag = $("#formasPagamento").val();

        if (formaDePag == "boleto" || formaDePag == "") {
            $(".formaDePagamento").hide();
            $("#footer").css('margin-top', '149px');
        } else {
            $(".formaDePagamento").show();
            $("#footer").css('margin-top', '0');
        }
    });

    $("#btnConfirmarFormaPagamento").click(function (e) {
        e.preventDefault();
        sessionStorage.setItem('formaPagamento', "");
        var numRetorno = 0;
        if (formaDePag == null || formaDePag == "") {
            $(".modal-body p").html('Selecione uma forma de pagamento antes de proseguir');
            $(".modal").modal('show');
            return false;
        } else if (formaDePag == "boleto") {
            sessionStorage.setItem('formaPagamento', formaDePag);
            location.href = 'resumo-pagamento.html';
        } else {
            $('#formFormasPagamentos').find('input[required]').each(function () {
                if ($(this).val() == '' || $(this).val() == null) {
                    $(".modal-body p").html('O campo ' + $(this).attr('data-nomeCampo') + ' é obrigatório');
                    $(".modal").modal('show');
                    numRetorno = 0;
                    return false
                } else
                    return numRetorno = 1;
            });

            if (numRetorno == 1) {
                sessionStorage.setItem('numeroCartao', $("#numeroCartao").val());
                sessionStorage.setItem('parcela', $("#parcelamento").val());
                sessionStorage.setItem('formaPagamento', formaDePag);
                location.href = 'resumo-pagamento.html';
            }
        }
    });

    // MASCARAS DOS CAMPOS
    new Cleave('#numeroCartao', {
        delimiters: [' ', ' ', ' '],
        blocks: [4, 4, 4, 4],
        numericOnly: true
    });
});