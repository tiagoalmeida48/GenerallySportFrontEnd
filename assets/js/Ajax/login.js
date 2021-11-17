var token = localStorage.getItem('token');
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
                localStorage.setItem('token', result.data.token);
                location.href = 'index.html';
            },
            error: function (err) {
                console.log(err.responseText);
            },
            complete: function () {
                console.log("Finalizado") 
            }
        });
    }
});