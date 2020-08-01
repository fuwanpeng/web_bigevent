$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^\S{6,12}$/, '密码长度为6-12位'

        ],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '与原始密码不能相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }

    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // $('.layui-form')[0].reset()
                window.parent.localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        })
    })
})