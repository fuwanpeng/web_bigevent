$(function () {
    $('#go-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#go-reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^\S{6,12}$/, '密码为6-12位，不能含有空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册表单提交
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#form_reg')[0].reset()
                $('#go-login').click()
            }
        })
    })
    //登录表单提交
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})
