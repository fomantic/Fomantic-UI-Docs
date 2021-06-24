semantic.toast = {};

var globalToast;
var noPinkFound = function() {
  $('body').toast({
    message: 'Please open the pink toast first!',
    class:'warning',
    showIcon: true
  });
}

// ready event
semantic.toast.ready = function() {

  /* Behaviors */
  $('#jsaccess_toast_init').click(function(){
    if(!globalToast) {
      globalToast = $('body').toast({
        message: 'This pink toast stays for a long time. It is returned as object when created, so you can interact with it via Javascript',
        displayTime: 120000,
        showProgress: 'top',
        class: 'pink',
        onHidden: function () {
          globalToast = undefined;
        }
      });
    } else {
      $('body').toast({
        message: 'The pink toast is already shown',
        class:'error',
        showIcon: true
      });
    }
  });


  $('#jsaccess_toast_remaining').click(function(){
    if (globalToast) {
      var remainingTime = $(globalToast).toast('get remainingTime');
      $('body').toast({
        message: (remainingTime/1000).toFixed(2) +' seconds left',
        class:'info',
        showIcon: true
      });
    } else {
      noPinkFound();
    }
  });
  $('#jsaccess_toast_howmany').click(function(){
    if (globalToast) {
      var howMany = $(globalToast).toast('get toasts');
      $('body').toast({
        message: howMany.length +' toast are currently shown (without this one!)',
        class:'info',
        showIcon: true
      });
    } else {
      noPinkFound();
    }
  });
  $('#jsaccess_toast_close').click(function(){
    if (globalToast) {
      $(globalToast).toast('close');
    } else {
      noPinkFound();
    }
  });

};


// attach ready event
$(document)
  .ready(semantic.toast.ready)
;