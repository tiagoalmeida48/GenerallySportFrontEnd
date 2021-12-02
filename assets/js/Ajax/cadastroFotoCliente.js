$(function () {
    var token = sessionStorage.getItem('token');
    var idCliente = sessionStorage.getItem("idCliente");

    if (idCliente != null && idCliente != "") {
        $("#btnIgnorarEtapa").attr('href', 'meus-dados.html')
    }
    $("#btnCadastroCliente").click(function (e) {
        e.preventDefault;
        var cpf = sessionStorage.getItem('cpf');
        var formdata = new FormData();

        formdata.append('files', $("#foto")[0].files[0]);
        formdata.append('CPF', cpf);

        $.ajax({
            url: 'https://localhost:44392/api/UploadImages',
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            seccess: function (result) {
                sessionStorage.setItem('fotoCliente', $("#foto")[0].files[0])
            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
                //console.log("Finalizado")
            }
        });

        if (idCliente != null && idCliente != "") {
            location.href = "meus-dados.html";
            var fotoCliente = sessionStorage.getItem('fotoCliente');
            var foto = fotoCliente == null || fotoCliente == '' ? '../perfil.png' : fotoCliente;
            $(".imgLogin").attr('src', './assets/images/FotosCliente/' + foto)
        }

        location.href = 'login.html'
    });

    $('body').on("change", "input[type=file]", function () {
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