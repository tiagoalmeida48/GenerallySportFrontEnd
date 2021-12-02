$(function(){
    var token = sessionStorage.getItem('token');
    var fotoCliente = sessionStorage.getItem('fotoCliente');

    if(token != null && token != ''){
        var foto = fotoCliente == null || fotoCliente == '' ? '../perfil.png' : fotoCliente;
        $(".imgLogin").attr('src', './assets/images/FotosCliente/' + foto)
        $(".linkSairSistema").show();
        $(".linkPerfil").attr('href', '/meus-dados.html');
    } else {
        $(".imgLogin").attr('src', './assets/images/cadeado.png')
        $(".linkPerfil").attr('href', '/login.html');
        $(".linkSairSistema").hide();
    }

    $(".linkSairSistema").click(function(){
        sessionStorage.clear();
    });
})