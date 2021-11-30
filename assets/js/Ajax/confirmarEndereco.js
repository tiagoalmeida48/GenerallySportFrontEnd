$(function () {
    var token = sessionStorage.getItem('token');
    var idCliente = sessionStorage.getItem('idCliente');

    $.ajax({
        url: 'https://localhost:44392/api/Cliente/' + idCliente,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (result) {
            var cep = result.endereco.cep;
            $(".dadosCliente").html(`
                <h4>CEP: ${cep.substring(0,5)}-${cep.substring(5)}</h4>
                <h4>Logradouro: ${result.endereco.logradouro}</h4>
                <h4>Número: ${result.endereco.numero}</h4>
                ${result.endereco.complemento != ''? `<h4>Complemento: ${result.endereco.complemento}</h4>` : ""}
                <h4>Bairro: ${result.endereco.bairro}</h4>
                <h4>Cidade: ${result.endereco.cidade}</h4>
                <h4>Estado: ${result.endereco.uf}</h4>
            `);
        },
        error: function (err) {
            console.log(err);
        }
    });
})