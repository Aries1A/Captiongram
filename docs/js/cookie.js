$(function(){

//#newtweetcheckをクリック時に値をクッキーに格納
$(document).on("click","#newtweetcheck", function(){
     let checked=$("#newtweetcheck").get(0).checked;
     console.log(checked);
     $.cookie("newtweet", checked,{ expires: 730 });
     console.log($.cookie("newtweet"));
});
//ページを読み込んだ時に#newtweetcheckの値を設定
     const _newtweet=$.cookie("newtweet");
     if(_newtweet != "false"){
     $("#newtweetcheck").attr("checked",true);
     }

});
