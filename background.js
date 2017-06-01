
var CONTEXT_MENU_TYPES = ["selection"];
var CONTEXT_MENU_ITEM_ID = "contextMenuTranslation";
var CONTEXT_MENU_OTHER_LANG_ITEM_ID = "contextMenuOtherLangTranslation";
var TRANSLATION_URL_SERVICE = "http://www.freetranslation.com/gw-mt-proxy-service-web/mt-translation";
var API_KEY = "BeGlobal apiKey=X28%2BBBi1LiRYZpnZlawGfg%3D%3D";

var translateData = null;
var sourceLang = null;
var targetLang = null;

var eventHandlers = {"textSelection": textSelectionHandler, "otherwise": unknownMessageHandler};

function textSelectionHandler(data) {
    window.translateData = data;
    console.log("On message event, textSelection. Selected text:" + data.text); 
    updateCurrentTranslationContext();
}

function unknownMessageHandler(message) {
    console.log("Error during event processing. Unknown message type:" + message)
}

function translateDefaultText(info,tab) {
    translateText(translateData.text, sourceLang.id, targetLang.id, info, tab);
}

function translateText(text, from, to, info, tab)
{
    console.log("Building translation DTO...");
  
    var data = {text: translateData.text, 
                from: from,
		to: to}

    console.log("Creating http request...");
    
    var jax = new XMLHttpRequest();
    jax.open("PUT",TRANSLATION_URL_SERVICE);
    jax.setRequestHeader("Content-Type","application/json; charset=UTF-8");
    jax.setRequestHeader("Authorization",API_KEY);
    
    console.log("Sending data..." + JSON.stringify(data));
    jax.send(JSON.stringify(data));
    
    jax.onreadystatechange = function() { 
      if(jax.readyState==4) { 
	console.log("Receiving translation response...");
	
	var translation = null;
	var error = null;
	try {
	    var translationResult = JSON.parse(jax.responseText);
	    if (translationResult && translationResult.translation)
	      translation = translationResult.translation;
	    else
	      error = "Translation unavailable";
	}
	catch(e) {
	  console.log("Error parsing response:" + e.message);
	  error = "An error has ocurred during translation";
	}
	chrome.tabs.sendMessage(tab.id, {text:translateData.text , result:translationResult.translation, error:error});
      }
    };
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse)
{
    var handler = eventHandlers[request.message];
    if (handler) {
      handler(request.data);
    }
    else {
      eventHandlers.otherwise(request.message);
    }  
});

function getOps() {
    return {sourceLang: sourceLang.id,
            targetLang: targetLang.id,
            otherTranslationEnabled: JSON.parse(localStorage.otherTranslationEnabled)};
}

function setOps(newOps) {
  localStorage.sourceLang = newOps.sourceLang;
  localStorage.targetLang = newOps.targetLang;
  localStorage.otherTranslationEnabled = newOps.otherTranslationEnabled;
  
  sourceLang = languages.getLang(localStorage.sourceLang);
  targetLang = languages.getLang(localStorage.targetLang);
  
  updateOps();
}

function updateOps() {
  if (translateData)
    updateCurrentTranslationContext();
  
  updateContextMenuLangs();
}

function updateCurrentTranslationContext() {
  chrome.contextMenus.update(CONTEXT_MENU_ITEM_ID, {title: "Translate \"" + translateData.text + "\" to " + targetLang.name +"..."});
}

function updateContextMenuLangs() {
  if (localStorage.otherTranslationEnabled) {
    for (var i = 0; i < CONTEXT_MENU_TYPES.length; i++) {
          var context = CONTEXT_MENU_TYPES[i];
	  var otherLangId = chrome.contextMenus.create({title: "Translate to other...", id: CONTEXT_MENU_OTHER_LANG_ITEM_ID, contexts:[context]}); 
	  
	  console.log("translation submenus items:" + languages.list.length);
	  for (var j=0; j<languages.list.length;j++) {
	    var lang = languages.list[j];
			     
	    chrome.contextMenus.create({"title": "--> " + lang.name, 
				        "parentId": otherLangId, 
				        "id":lang.id, 
				        "contexts":[context], 
				        "onclick": function(info, tab) {
			                             translateText(translateData.text, sourceLang.id, info.menuItemId, info, tab);
			                           }
	                                });
	    
	    console.log("translation menu item created for:" + lang.name);
	  } 	
    }
  }
  else {
    console.log("Other languages translations disabled");
    chrome.contextMenus.remove(CONTEXT_MENU_OTHER_LANG_ITEM_ID); 
  }    
}

function createContextualMenuTranslation() {
  for (var i = 0; i < CONTEXT_MENU_TYPES.length; i++)
  {
	var context = CONTEXT_MENU_TYPES[i];
	var id = chrome.contextMenus.create({title: "Translate...", 
				             contexts:[context],
				             id:CONTEXT_MENU_ITEM_ID,
				             onclick: translateDefaultText});  
	
	console.log("translation menu item created:" + id);
  }	
}

function getAvailableLangs() {
  return languages.list;
}

function init() {
  
  if (!localStorage.isInitialized) {
    
    console.log("Local storage not initialized");
    
    sourceLang = languages.defaultLang();
    localStorage.sourceLang = sourceLang.id;
    
    targetLang = languages.defaultLangTranslation();
    localStorage.targetLang = targetLang.id;
    
    localStorage.otherTranslationEnabled = false;
    
    console.log("Initializing local storage with: sourceLang=" + localStorage.sourceLang + " and targetLang=" + localStorage.targetLang + " others enabled=" + localStorage.otherTranslationEnabled);
    localStorage.isInitialized = true;
  }
  else {
   
    console.log("Local storage initialized");
    console.log("Local storage values: sourceLang=" + localStorage.sourceLang + " and targetLang=" + localStorage.targetLang + " others enabled=" + localStorage.otherTranslationEnabled);
    
    sourceLang = languages.getLang(localStorage.sourceLang);
    targetLang = languages.getLang(localStorage.targetLang);
  }  
  
  createContextualMenuTranslation();
  updateContextMenuLangs();
}



init();