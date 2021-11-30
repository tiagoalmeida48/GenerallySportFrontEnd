$(function () {
    var token = sessionStorage.getItem('token');
    var idCliente = sessionStorage.getItem('idCliente');

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#cep").val("");
        $("#logradouro").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#logradouro").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#logradouro").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep(); 
                        $(".modal-body p").html('CEP inválido');               
                        $(".modal").modal('show');
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                $(".modal-body p").html('CEP inválido');               
                $(".modal").modal('show');
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });

    $.ajax({
        url: 'https://localhost:44392/api/Cliente/' + idCliente,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (result) {
            $("#idEndereco").val(result.endereco.id);
            $("#cep").val(result.endereco.cep);
            $("#logradouro").val(result.endereco.logradouro);
            $("#numero").val(result.endereco.numero);
            $("#complemento").val(result.endereco.complemento);
            $("#bairro").val(result.endereco.bairro);
            $("#cidade").val(result.endereco.cidade);
            $("#uf").val(result.endereco.uf);
        },
        error: function (err) {
            console.log(err);
        }
    });

    $("#btnCadastroEndereco").click(function(e){
        e.preventDefault();
        var boolContinue = false;

        $('#formCadastroEndereco').find('input[required]').each(function(){
            if($(this).val() == '' || $(this).val() == null){
                $(".modal-body p").html('O campo ' + $(this).attr('data-nomeCampo') + ' é obrigatório');               
                $(".modal").modal('show');
                return boolContinue = false;
            }
            else
                return boolContinue = true;
        });

        if(!boolContinue)
            return false;

        var endereco = {
            id: parseInt($("#idEndereco").val()),
            cep: $("#cep").val().replace('-', ""),
            logradouro: $("#logradouro").val(),
            numero: $("#numero").val(),
            complemento: $("#complemento").val(),
            bairro: $("#bairro").val(),
            cidade: $("#cidade").val(),
            uf: $("#uf").val()
        }

        $.ajax({
            url: 'https://localhost:44392/api/Endereco/' + endereco.id,
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + token },
            data: JSON.stringify(endereco),
            success: function(){
                location.href = 'forma-pagamento.html';
            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
            
            }
        });
    });

    // MASCARAS DOS CAMPOS
    new Cleave('#cep', {
        delimiters: ['-'],
        blocks: [5, 3],
        numericOnly: true
    });
})