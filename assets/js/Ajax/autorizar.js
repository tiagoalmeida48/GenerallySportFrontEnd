$(function(){
    var fotoCliente = sessionStorage.getItem('fotoCliente');

    if(fotoCliente != null && fotoCliente != ''){
        $(".imgLogin").attr('src', './assets/images/FotosCliente/' + fotoCliente)
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