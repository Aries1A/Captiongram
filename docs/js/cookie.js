$(function(){

//#checkAllcheckをクリック時に値をクッキーに格納
$(document).on("click","#checkAll", function(){
     let checked=$("#checkAll").get(0).checked;
     console.log(checked);
     $.cookie("checkAll", checked,{ expires: 730 });
     console.log($.cookie("checkAll"));
});
//ページを読み込んだ時に#checkAllcheckの値を設定
     const _checkAll=$.cookie("checkAll");
     if(_checkAll != "true"){
     $("#checkAll").attr("checked",false);
     }

});
