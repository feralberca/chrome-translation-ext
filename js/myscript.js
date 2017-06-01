
document.addEventListener('mouseup',function(event)
  {
    console.log("Mouse Up event received...");
    
    var selectedText = window.getSelection().toString();
    
    console.log("Building event data dto...");
    
    var dto = {text: selectedText};
  
    console.log("Sending message to background page...");       
	       
    if(selectedText.length) {
      
      chrome.extension.sendMessage({'message':'textSelection',
                                    'data': dto},
                                    function(response){});
      
      console.log("Text selection detected. Selected text:" + selectedText);
    }
    else {
      console.log("No text selection detected...");
    }
    
});

chrome.runtime.onMessage.addListener(function(translation, sender, sendResponse) {
  $.jGrowl("<p class='easy-translator-content'><span class='easy-translator-text'>" + translation.text + "</span> means: <span class='easy-translator-translation'>" + translation.result + "</span></p>");
});

$(document).ready(function(){
    $.jGrowl.defaults.life = 6000;
});
