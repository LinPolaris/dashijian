$(function(){

    $('#logout').on('click', function() {
        layer.confirm('您确定要退出吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            //清除本地存储token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
          });
    })

    getUserInfo()
    function getUserInfo(){
         $.ajax({
             method: "get",
             url: "/my/userinfo",
            //  headers: {Authorization: localStorage.getItem('token')},
             success: function (res) {
                if (res.status !== 0 ) {
                    return layui.layer.msg("获取用户信息失败")
                }
                console.log(res);
                render(res.data)
             },
            //  complete: function(res){
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
            //  }
         });
    } 
    function render(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎' + '&nbsp;&nbsp;&nbsp;' + '<em>' + name + '<em>')
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
        
    }
})