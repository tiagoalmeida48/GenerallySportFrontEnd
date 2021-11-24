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
                gravarNomeCliente();
                //location.href = 'index.html';
            }
        });
    }

    function gravarIdCliente(token){
        token = sessionStorage.getItem('token');

        $.ajax({
            url: 'https://localhost:44392/ObterIdUsuarioLogado',
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) { 
                console.log(result);
            }
        });
    }

    function gravarNomeCliente(){
        var resultNome;
        console.log('ok')
        token = sessionStorage.getItem('token');
        $.ajax({
            url: 'https://localhost:44392/ObterNomeUsuarioLogado',
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function (result) { 
                console.log(result);
            }
        });

        //console.log(resultNome);
    }
});