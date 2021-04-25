$(function() {
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon: 5})
                }
                // $('[name=id]').val(res.data.id)
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)
                layui.form.val('formUserInfo',res.data)
            },
        })
    }
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
    layui.form.verify({
        rlength(val){
            if (val.length > 6) {
                return '昵称需小于6个字符'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon: 5})
                }
                 layui.layer.msg(res.message,{icon: 6})
                 window.parent.getUserInfo()
            },
        })
    })
})