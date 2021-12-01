$(function () {
    $("#recuperarSenha").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'https://localhost:44392/api/Cliente/enviarEmail/' + $("#email").val(),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $(".modal-body").html(result);
                $(".modal").modal('show');
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});