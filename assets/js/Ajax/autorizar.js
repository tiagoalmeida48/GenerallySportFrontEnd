$(function(){
    var token = sessionStorage.getItem('token');
    if(token == null)
        location.href = 'login.html';
})