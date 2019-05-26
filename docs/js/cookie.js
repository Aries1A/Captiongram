$(function() {
  console.log($.cookie());

  $(document).on('click', '#checkAll', function() {
    let checkAll = $('#checkAll').get(0).checked;
    console.log(checkAll);
    $.cookie('checkAll', checkAll, {
      expires: 730
    });
    $.cookie('Datecheck', checkAll, {
      expires: 730
    });
    $.cookie('Cameracheck', checkAll, {
      expires: 730
    });
    $.cookie('Lenscheck', checkAll, {
      expires: 730
    });
    $.cookie('Lengthcheck', checkAll, {
      expires: 730
    });
    $.cookie('Timecheck', checkAll, {
      expires: 730
    });
    $.cookie('FNumbercheck', checkAll, {
      expires: 730
    });
    $.cookie('ISOcheck', checkAll, {
      expires: 730
    });
    console.log($.cookie());
  });

  const _checkAll = $.cookie('checkAll');
  if (_checkAll == 'false') {
    $('#checkAll').attr('checked', false);
  }

  $(document).on('click', '#Datecheck', function() {
    let Datechecked = $('#Datecheck').get(0).checked;
    console.log(Datechecked);
    $.cookie('Datecheck', Datechecked, {
      expires: 730
    });
    console.log($.cookie('Datecheck'));
  });
  const _Datecheck = $.cookie('Datecheck');
  if (_Datecheck == 'false') {
    $('#Datecheck').attr('checked', false);
  }

  $(document).on('click', '#Cameracheck', function() {
    let Camerachecked = $('#Cameracheck').get(0).checked;
    console.log(Camerachecked);
    $.cookie('Cameracheck', Camerachecked, {
      expires: 730
    });
    console.log($.cookie('Cameracheck'));
  });
  const _Cameracheck = $.cookie('Cameracheck');
  if (_Cameracheck == 'false') {
    $('#Cameracheck').attr('checked', false);
  }

  $(document).on('click', '#Lenscheck', function() {
    let Lenschecked = $('#Lenscheck').get(0).checked;
    console.log(Lenschecked);
    $.cookie('Lenscheck', Lenschecked, {
      expires: 730
    });
    console.log($.cookie('Lenscheck'));
  });
  const _Lenscheck = $.cookie('Lenscheck');
  if (_Lenscheck == 'false') {
    $('#Lenscheck').attr('checked', false);
  }

  $(document).on('click', '#Lengthcheck', function() {
    let Lengthchecked = $('#Lengthcheck').get(0).checked;
    console.log(Lengthchecked);
    $.cookie('Lengthcheck', Lengthchecked, {
      expires: 730
    });
    console.log($.cookie('Lengthcheck'));
  });
  const _Lengthcheck = $.cookie('Lengthcheck');
  if (_Lengthcheck == 'false') {
    $('#Lengthcheck').attr('checked', false);
  }

  $(document).on('click', '#Timecheck', function() {
    let Timechecked = $('#Timecheck').get(0).checked;
    console.log(Timechecked);
    $.cookie('Timecheck', Timechecked, {
      expires: 730
    });
    console.log($.cookie('Timecheck'));
  });
  const _Timecheck = $.cookie('Timecheck');
  if (_Timecheck == 'false') {
    $('#Timecheck').attr('checked', false);
  }

  $(document).on('click', '#FNumbercheck', function() {
    let FNumberchecked = $('#FNumbercheck').get(0).checked;
    console.log(FNumberchecked);
    $.cookie('FNumbercheck', FNumberchecked, {
      expires: 730
    });
    console.log($.cookie('FNumbercheck'));
  });
  const _FNumbercheck = $.cookie('FNumbercheck');
  if (_FNumbercheck == 'false') {
    $('#FNumbercheck').attr('checked', false);
  }

  $(document).on('click', '#ISOcheck', function() {
    let ISOchecked = $('#ISOcheck').get(0).checked;
    console.log(ISOchecked);
    $.cookie('ISOcheck', ISOchecked, {
      expires: 730
    });
    console.log($.cookie('ISOcheck'));
  });
  const _ISOcheck = $.cookie('ISOcheck');
  if (_ISOcheck == 'false') {
    $('#ISOcheck').attr('checked', false);
  }




});
