$(function(){

//checkAllをクリック時に値をクッキーに格納
$(document).on("click","checkAll", function(){
     let checked=$("checkAll").get(0).checked;
     console.log(checked);
     $.cookie("newtweet", checked,{ expires: 730 });
     console.log($.cookie("newtweet"));
});
//ページを読み込んだ時にcheckAllの値を設定
     const _newtweet=$.cookie("newtweet");
     if(_newtweet != "false"){
     $("checkAll").attr("checked",true);
     }

});
