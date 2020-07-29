$(function () {
    $('#go-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#go-reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
})
