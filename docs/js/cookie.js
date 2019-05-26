$(function(){

//checkAllをクリック時に値をクッキーに格納
$(document).on("click","#checkAll", function(){
     let checked=$("#checkAll").get(0).checked;
     console.log(checked);
     $.cookie("checkAll", checked,{ expires: 730 });
     console.log($.cookie("checkAll"));
});
//ページを読み込んだ時にcheckAllの値を設定
     const _checkAll=$.cookie("checkAll");
     if(_checkAll != "false"){
     $("#checkAll").attr("checked",true);
     }

});
