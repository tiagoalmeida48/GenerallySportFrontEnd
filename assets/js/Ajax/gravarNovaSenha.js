$(function(){
    var idCliente = sessionStorage.getItem('idCliente');

    $("#btnNovaSenha").click(function(e){
        e.preventDefault();

        var novaSenha = {
           // id: parseInt($("#idCliente").val()),
            id: idCliente,
            senha: $("#senha").val()      
        }


        $.ajax({
            url: 'https://localhost:44392/api/Cliente/resetarSenha/',
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(novaSenha),
            success: function(){
                location.href = 'nova-senha.html';
            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
            
            }
        });
    });
});