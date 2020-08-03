$(function () {
    var form = layui.form
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
    var id = location.href.split('=')[1]
    $.ajax({
        type: 'get',
        url: '/my/article/' + id,
        success: function (res) {
            console.log(res)
            $('[name="title"]').val(res.data.title)
            $image.attr("src", baseURL + res.data.cover_img)
            // console.log(baseURL + res.data.cover_img)
            setTimeout(function () {
                tinyMCE.activeEditor.setContent(res.data.content);
            }, 1000)
            initcate(res.data.cate_id)
            $('[name=Id]').val(res.data.Id)
        }
    })

    function initcate(id) {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                res.id = id
                var list = template('tpl-cate', res)
                $('[name=cate_id]').html(list)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
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
    $('#editform').on('submit', function (e) {
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
                console.log(...fd)
                $.ajax({
                    type: 'post',
                    url: '/my/article/edit',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('修改文章失败！')
                        }
                        layer.msg('修改文章成功！')
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