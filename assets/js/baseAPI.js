//测试路径
var testURL = 'http://ajax.frontend.itheima.net'


//过滤每次ajax请求，配置每次请求参数
$.ajaxPrefilter(function (options) {
    options.url = testURL + options.url
})