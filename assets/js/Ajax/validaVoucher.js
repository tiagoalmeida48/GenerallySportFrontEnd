$(function(){

    $("#linkValidaVoucher").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'https://localhost:44392/api/Voucher/validar/' + $("#numVoucher").val(),
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(result){
                $(".modal-body").html(result);
            $(".modal").modal('show');
            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
            
            }
        });
    })
});