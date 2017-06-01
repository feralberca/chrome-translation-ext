$(document).ready(function(){
  
    console.log("Getting background page options...");
    var ops = chrome.extension.getBackgroundPage().getOps();
    
    console.log("Getting available langs...");
    var langs = chrome.extension.getBackgroundPage().getAvailableLangs();
    
    var sourceOptions = '';
    var targetOptions = '';
    
    console.log("Generating select options...");
    $.each(langs, function () {
      var id = this["id"];
      var text = this["name"];
      
      var sourceSelected = (ops.sourceLang==id)?" selected ":"";
      sourceOptions += '<option value="' + id + '"' + sourceSelected + '>' + text + '</option>';
      
      var targetSelected = (ops.targetLang==id)?" selected ":"";
      targetOptions += '<option value="' + id + '"' + targetSelected + '>' + text + '</option>';
    });
    
    console.log("Setting selects events...");
    $("#sourceLangSelect").html(sourceOptions).change(function() {
      setNewOps();
    });
    
    $("#targetLangSelect").html(targetOptions).change(function() {
      setNewOps();
    });
   
    if (ops.otherTranslationEnabled)
      $("#enableOtherLangs").attr("checked", "checked");
    
    $("#enableOtherLangs").change(function() {
      setNewOps();
    });
});

function setNewOps() {
     var newOps = {sourceLang: $("#sourceLangSelect").val(), targetLang: $("#targetLangSelect").val(), otherTranslationEnabled: $("#enableOtherLangs").is(':checked') };
     
     console.log("Setting up new ops:" + JSON.stringify(newOps));
     chrome.extension.getBackgroundPage().setOps(newOps);
}