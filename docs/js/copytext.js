function copyToClipboard() {
  var yourCode = document.getElementById('textExif');
  var range = document.createRange();
  range.selectNode(yourCode);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  alert('コピーしました');
        }
