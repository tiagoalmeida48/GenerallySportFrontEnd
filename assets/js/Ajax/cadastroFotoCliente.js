$(function () {
    $("#btnCadastroCliente").click(function (e) {
        e.preventDefault();

        var formdata = new FormData();

        formdata.append('files', $("#foto")[0].files[0]);
        formdata.append('CPF', localStorage.getItem('cpf'));

        // console.log($("#foto")[0].files[0]);
        console.log(formdata);
        $.ajax({
            url: 'https://localhost:44392/api/UploadImages',
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            error: function (err) {
                console.log(err);
            },
            complete: function () {
                console.log("Finalizado")
            }
        });
        //location.href = 'login.html'

    });

    $('body').on("change", "input[type=file]", function() {
        readURL(this);
    });

    function readURL(input) {
        if (input.files) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#fotoPerfil").attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    };
});