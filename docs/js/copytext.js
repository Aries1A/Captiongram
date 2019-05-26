function copyToClipboard() {
  var yourCode = document.getElementById('textExif1');
  var range = document.createRange();
  range.selectNode(yourCode);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  alert('コピーしました');
}

function copyToClipboard() {
  var yourCode = document.getElementById('textExif2');
  var range = document.createRange();
  range.selectNode(yourCode);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  alert('コピーしました');
}
