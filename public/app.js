function DisableBackButton(){
    window.history.back()
   }
   DisableBackButton();
   window.onload = DisableBackButton;
   window.onpageshow = function(evt) { if (evt.persisted) DisableBackButton() }
   window.onload = function() {void(0)}