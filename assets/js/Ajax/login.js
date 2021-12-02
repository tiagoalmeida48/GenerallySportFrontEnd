$(function () {
    var token = sessionStorage.getItem('token');
    var idCliente = sessionStorage.getItem('idCliente');
    $("#btnAcessarLogin").click(logar);

    function logar(e){
        e.preventDefault();
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
                token = sessionStorage.getItem('token')
                $.ajax({
                    url: 'https://localhost:44392/ObterIdUsuarioLogado',
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    headers: { 'Authorization': 'Bearer ' + token },
                    success: function (result) { 
                        sessionStorage.setItem('idCliente', result);
                        $.ajax({
                            url: 'https://localhost:44392/ObterNomeUsuarioLogado',
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            headers: { 'Authorization': 'Bearer ' + token },
                            success: function (result) { 
                                sessionStorage.setItem('nomeCliente', result);
                                idCliente = sessionStorage.getItem('idCliente');
                                $.ajax({
                                    url: 'https://localhost:44392/api/Cliente/' + idCliente,
                                    type: "GET",
                                    contentType: "application/json; charset=utf-8",
                                    headers: { 'Authorization': 'Bearer ' + token },
                                    success: function (result) { 
                                        sessionStorage.setItem('fotoCliente', result.caminhoFoto)
                                        location.href = 'index.html';
                                    },
                                    error: function (erro) {
                                        console.log(erro)
                                    }
                                });
                            },
                            error: function (erro) {
                                console.log(erro)
                            }
                        });
                    },
                    error: function (erro) {
                        console.log(erro)
                    }
                });
            },
            error: function (erro) {
                $(".modal-body").html("E-mail e senha estão incorretos");
                $(".modal").modal('show');
            }
        });




    }
});