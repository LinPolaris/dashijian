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