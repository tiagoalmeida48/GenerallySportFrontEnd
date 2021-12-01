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
            console.log(result)
            var cep = result.endereco.cep;
            $(".dadosCliente").html(`
                <h4>Nome: ${result.nome}</h4>
                <h4>Data de Nascimento: ${result.dataNascimento.substring(8,10)}/${result.dataNascimento.substring(5,7)}/${result.dataNascimento.substring(0,4)}</h4>
                <h4>Sexo: ${result.sexo == "M" ? "Masculino" : "Feminino"}</h4>
                <h4>CPF: ${result.cpf.substring(0,3)}.${result.cpf.substring(3,6)}.${result.cpf.substring(6,9)}-${result.cpf.substring(9,11)}</h4>
                <h4>E-mail: ${result.email}</h4>
                <h4>Telefone: (${result.telefone.substring(0,2)}) ${result.telefone.substring(2,6)}-${result.telefone.substring(6,10)}</h4>
                <h4>Celular: (${result.celular.substring(0,2)}) ${result.celular.substring(2,7)}-${result.celular.substring(7,11)}</h4>
                <h4>CEP: ${cep.substring(0,5)}-${cep.substring(5)}</h4>
                <h4>Logradouro: ${result.endereco.logradouro}</h4>
                <h4>Número: ${result.endereco.numero}</h4>
                ${result.endereco.complemento != ''? `<h4>Complemento: ${result.endereco.complemento}</h4>` : ""}
                <h4>Bairro: ${result.endereco.bairro}</h4>
                <h4>Cidade: ${result.endereco.cidade} / ${result.endereco.uf}</h4>
            `);
        },
        error: function (err) {
            console.log(err);
        }
    });
})