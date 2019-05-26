$(function(){

  const checkAll = '#checkAll'; //「すべて」のチェックボックスのidを指定
  const checkBox = 'input[name="area[]"]'; //チェックボックスのnameを指定

  $( checkAll ).on('click', function() {
    $( checkBox ).prop('checked', $(this).is(':checked') );
  });

  $( checkBox ).on( 'click', function() {
    const boxCount = $( checkBox ).length; //全チェックボックスの数を取得
    const checked  = $( checkBox + ':checked' ).length; //チェックされているチェックボックスの数を取得
    if( checked === boxCount ) {
      $( checkAll ).prop( 'checked', true );
    } else {
      $( checkAll ).prop( 'checked', false );
    }
  });

});
