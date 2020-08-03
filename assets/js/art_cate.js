$(function () {
    var layer = layui.layer
    var form = layui.form
    var indexAdd = null;
    intiArtCateList()
    function intiArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var list = template('artcatelist', res)
                $('tbody').html(list)
            }
        })
    }
    $('#addcate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#add_form', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                intiArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })
    var indexedit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        console.log(id)
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('edit_form', res.data)
            }
        })
    })
    $('body').on('submit', '#edit_form', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                intiArtCateList()
                layer.msg('修改分类成功！')
                layer.close(indexedit)
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    intiArtCateList()
                }
            })
        })
    })
})