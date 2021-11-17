$(function(){
    var token = localStorage.getItem('token');
    if(token == null)
        location.href = 'login.html';
})