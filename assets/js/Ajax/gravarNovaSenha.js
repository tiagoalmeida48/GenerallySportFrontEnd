$(function(){
    var url = new URL(window.location.href);
    var idCliente = url.searchParams.get('id');

    $("#btnNovaSenha").click(function(e){
        e.preventDefault();

        var formdata = new FormData();

        formdata.append('id', idCliente);
        formdata.append('senha', $("#senha").val());

        $.ajax({
            url: 'https://localhost:44392/api/Cliente/resetarSenha/',
            type: "PUT",
            contentType: false,
            processData: false,
            data: formdata,
            success: function(){
                location.href = 'login.html';
            },
            error: function (err) {
                $(".modal-body").html("Ocorreu um erro, tente novamente");
                $(".modal").modal('show');
            },
            complete: function () {
            
            }
        });
    });
});