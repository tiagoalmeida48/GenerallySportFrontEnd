/* 
    $.ajax({
        url: 'https://localhost:44392/api/PedidoVenda/' + id,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            mostrarPedidosVenda(result[0]);
        },
        error: function (err) {
            console.log(err.responseText);
        },
        complete: function () {
            console.log("Finalizado")
        }
    }); */

    

    $("#formasPagamento").change(function(e) {
    var formaDePag = e.currentTarget.value;
    
    if (formaDePag == "boleto") {
        $("#formaPagCredito").hide()
    } else {
        $("#formaPagCredito").show()
    }
    
    var formaDePagValue = formaDePag;

    });

    // const formaDePagValue = document.getElementById("formasPagamento");
    // var formaDePagValue = $("#formasPagamento");
     console.log(formaDePagValue)   
     document.getElementById("formaPagResumo").innerHTML = formaDePagValue;

     const nomeValue = document.getElementById("nome");
     // var formaDePagValue = $("#formasPagamento");
      console.log(nomeValue)   
      document.getElementById("nomeResumo").innerHTML = nomeValue;

    

    /* $(document).ready(function (){
    $(document).on("onChange", ".formasPagamento", function() {
        console.log('chegou aqui')
        if ($(this).val() == "debitoCredito") {
          //  $("#kWh").show();
          console.log('chegou aqui 1')
        }else{
          //  $("#kWh").hide();
          console.log('chegou aqui 2')
        }
    });  
}); */