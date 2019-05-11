$('.button--border').removeClass('in');

$(document).ready(function() {
  setTimeout(function() {
    $('.button--border').addClass('in');
      setTimeout(function() {
        $('.button--border').addClass('ready');
      },500)
  },1000)
})

//0065bd 00686b
