$(function(){
  $('#Date').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!Date]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});

$(function(){
  $('#Camera').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!Camera]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});

$(function(){
  $('#Lens').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!Lens]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});

$(function(){
  $('#Length').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!Length]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});

$(function(){
  $('#Time').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!Time]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});

$(function(){
  $('#FNumber').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!FNumber]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});

$(function(){
  $('#ISO').on('click',function(){
    let textarea = document.querySelector('#textExif');

    let sentence = textarea.value;
    const len      = sentence.length;
    const pos      = textarea.selectionStart;

    const before   = sentence.substr(0, pos);
    const word     = '[!ISO]';
    const after    = sentence.substr(pos, len);
    sentence = before + word + after;
    textarea.value = sentence;
  });
});
