$(function(){
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

    // VALIDAR CPF
    function isCpf(cpf = 0){
        console.log(cpf);
        cpf = cpf.replace(/\.|-/g,"");
        let soma = 0;
        soma += cpf[0] * 10;
        soma += cpf[1] * 9;
        soma += cpf[2] * 8;
        soma += cpf[3] * 7;
        soma += cpf[4] * 6;
        soma += cpf[5] * 5;
        soma += cpf[6] * 4;
        soma += cpf[7] * 3;
        soma += cpf[8] * 2;
        soma = (soma * 10) % 11;

        if(soma == 10 || soma == 11) soma = 0;
        if(soma != cpf[9]) return false;

        soma = 0;
        soma += cpf[0] * 11;
        soma += cpf[1] * 10;
        soma += cpf[2] * 9;
        soma += cpf[3] * 8;
        soma += cpf[4] * 7;
        soma += cpf[5] * 6;
        soma += cpf[6] * 5;
        soma += cpf[7] * 4;
        soma += cpf[8] * 3;
        soma += cpf[9] * 2;
        soma = (soma * 10) % 11;

        if(soma == 10 || soma == 11) soma = 0;
        if(soma != cpf[10]) return false;

        return true;
    }

    $("#cpf").blur(function(){
        if(!isCpf($(this).val()))
            $("#cpfInvalido").text('CPF inválido');
        else
            $("#cpfInvalido").text('');
    });

    $("#redigiteSenha").keyup(function(){
        if($("#senha").val() != $("#redigiteSenha").val())
            $("#senhasDiferentes").text('As senha são diferentes');
        else
            $("#senhasDiferentes").text('');
    });

    // MASCARAS DOS CAMPOS
    new Cleave('#cpf', {
        delimiters: ['.', '.', '-'],
        blocks: [3, 3, 3, 2],
        numericOnly: true
    });

    new Cleave('#telefone', {
        delimiters: ['(', ') ', '-'],
        blocks: [0, 2, 4, 4],
        numericOnly: true
    });

    new Cleave('#celular', {
        delimiters: ['(', ') ', '-'],
        blocks: [0, 2, 5, 4],
        numericOnly: true
    });

    new Cleave('#cep', {
        delimiters: ['-'],
        blocks: [5,3],
        numericOnly: true
    });

    $("#btnCadastroCliente").click(function(e){
        e.preventDefault();
        var cpfInvalido = $("#cpfInvalido").text();
        var senhasDiferentes = $("#senhasDiferentes").text();
        if(cpfInvalido == '' && senhasDiferentes == ''){            
            $('#formCadastroCliente').find('input[required]').each(function(){
                if($(this).val() == '' || $(this).val() == null){
                    $(".modal-body p").html('O campo ' + $(this).attr('data-nomeCampo') + ' é obrigatório');               
                    $(".modal").modal('show');
                    return false;
                }
            });

            if(!$("#rbFeminino").prop('checked') && !$("#rbMasculino").prop('checked') && !$("#rbOutros").prop('checked')){
                $(".modal-body p").html('O campo sexo é obrigatório');               
                $(".modal").modal('show');
                return false;
            }
            
            var cliente = {
                nome: $("#nome").val(),
                cpf: $("#cpf").val().replace('.', '').replace('.', '').replace('-', ''),
                dataNascimento: $("#dataNascimento").val(),
                sexo: "F",
                celular: $("#celular").val().replace('(', '').replace(') ', '').replace('-', ''),
                telefone: $("#telefone").val().replace('(', '').replace(') ', '').replace('-', ''),
                email: $("#email").val(),
                senha: $("#senha").val(),
                caminhoFoto: "",
                endereco: {
                    cep: $("#cep").val().replace('-', ""),
                    logradouro: $("#logradouro").val(),
                    numero: $("#numero").val(),
                    complemento: $("#complemento").val(),
                    bairro: $("#bairro").val(),
                    cidade: $("#cidade").val(),
                    uf: $("#uf").val(),
                }
            };

            localStorage.setItem('cpf', cliente.cpf);

            console.log(JSON.stringify(cliente));
            $.ajax({
                url: 'https://localhost:44392/api/Cliente',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(cliente),
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    console.log("Finalizado")
                }
            });
            location.href = 'cadastro-foto.html'
        }
    });
});