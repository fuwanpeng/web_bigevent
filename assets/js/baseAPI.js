//测试路径
var testURL = 'http://ajax.frontend.itheima.net'


//过滤每次ajax请求，配置每次请求参数
$.ajaxPrefilter(function (options) {
    options.url = testURL + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})