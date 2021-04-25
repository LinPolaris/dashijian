$(function() {
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '请输入6-12位字符'
        ],
        newpass(val){
            if (val === $('[name=oldPwd]').val()) {
                return '新旧密码不能一样'
            }
        },
        repass(val){
           if (val !== $('[name=newPwd]').val()) {
               return '两次输入必须一致'
           }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon: 5})
                }
                 layui.layer.msg(res.message,{icon: 6}
                    // ,function() {
                    //     $('.layui-form')[0].reset()
                    // }
                    )
                $('.layui-form')[0].reset()
                console.log(this);
            },
        })
    })
})