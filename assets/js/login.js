$(function(){
    // console.log(111);
    // $('#link_reg').on('click',function(){
    //     $('.login-box').hide()
    //     $('.reg-box').show()
    // })
    // $('#link_login').on('click',function(){
    //     $('.login-box').show()
    //     $('.reg-box').hide()
    // })
    $('#link_reg,#link_login').on('click',function(){
        $('.login-box,.reg-box').toggle()
    })
    layui.form.verify({
        tpsd(value,item){
         if ($('#form_reg [name = password]').val() != value) {
             return '两次密码必须一致'
         }
        },
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] 
    })
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success(res){
               console.log(res);
               if (res.status != 0) {
                   return layui.layer.msg(res.message, {icon: 5}); 
               }
                  layui.layer.msg(res.message, {icon: 6},function(){
                $('#link_login').click()
              })
            }
        })
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success(res){
                if (res.status != 0) {
                    //layui弹层提示框
                    return layui.layer.msg(res.message,{icon: 5})
                }
                layui.layer.msg(res.message, {icon: 6},function(){
                    localStorage.setItem('token',res.token)
                     location.href = '/index.html'
                  })
            }
        })
    })
})