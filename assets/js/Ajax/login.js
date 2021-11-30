var token = sessionStorage.getItem('token');
if(token != null){
    $(".imgLogin").attr('src', './assets/images/profile1.jpg');
}

$(function () {
    $("#btnAcessarLogin").click(logar);

    function logar(){
        var cliente = {
            email: $('#email').val(),
            senha: $('#senha').val()
        }

        $.ajax({
            url: 'https://localhost:44392/api/Login',
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cliente),
            success: function (result) { 
                sessionStorage.setItem('token', result.data.token);
                gravarIdCliente();
                gravarNomeCliente();
                location.href = 'index.html';
            },
            error: function (erro) {
                console.log(erro)
            }
        });
    }

    function gravarIdCliente(){
        $.ajax({
            url: 'https://localhost:44392/ObterIdUsuarioLogado',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) { 
                sessionStorage.setItem('idCliente', result);
            }
        });
    }

    function gravarNomeCliente(){
        $.ajax({
            url: 'https://localhost:44392/ObterNomeUsuarioLogado',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) { 
                sessionStorage.setItem('nomeCliente', result);
            }
        });
    }
});