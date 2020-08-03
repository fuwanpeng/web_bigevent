$(function () {
    var form = layui.form
    var layer = layui.layer
    initcate()
    function initcate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                var list = template('tpl-cate', res)
                $('[name=cate_id]').html(list)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    // 富文本编辑器函数
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {

            return
        }
        var url = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', url) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('#artform').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)

        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                $.ajax({
                    type: 'post',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('发布文章失败！')
                        }
                        layer.msg('发布文章成功！')
                        // window.parent.$('#art').click()
                    }
                })
            })
        window.parent.document.getElementById('art').click()
        // location.href = '/article/art_list.html'
        // window.parent.document.getElementById('art').classList.add('layui-this')
        // window.parent.document.getElementById('reart').classList.remove('layui-this')
    })
})