var languages = {
  list: [
    { key:"ara", id:"505037985fe01ac20407b7f2", name:"Arabic"},
    { key:"ben", id:"505037985fe01ac20407b7f3", name:"Bengali"},
    { key:"bul", id:"505037985fe01ac20407b7f4", name:"Bulgarian"},
    { key:"chi", id:"505037985fe01ac20407b7f5", name:"Chinese (Simplified)"},
    { key:"cht", id:"505037985fe01ac20407b7f6", name:"Chinese (Traditional)"},
    { key:"cze", id:"505037985fe01ac20407b7f7", name:"Czech"},
    { key:"dan", id:"505037985fe01ac20407b7f8", name:"Danish"},
    { key:"dut", id:"505037985fe01ac20407b7fa", name:"Dutch"},
    { key:"eng", id:"505037985fe01ac20407b7fb", name:"English", defaultLangTranslation:true},
    { key:"est", id:"505037985fe01ac20407b7fe", name:"Estonian"},
    { key:"fin", id:"505037985fe01ac20407b7ff", name:"Finnish"},
    { key:"fra", id:"505037985fe01ac20407b800", name:"French"},
    { key:"ger", id:"505037985fe01ac20407b803", name:"German"},
    { key:"gre", id:"505037985fe01ac20407b804", name:"Greek"},
    { key:"heb", id:"505037985fe01ac20407b806", name:"Hebrew"},
    { key:"hin", id:"505037985fe01ac20407b807", name:"Hindi"},
    { key:"hun", id:"505037985fe01ac20407b808", name:"Hungarian"},
    { key:"ind", id:"505037985fe01ac20407b809", name:"Indonesian"},
    { key:"ita", id:"505037985fe01ac20407b80a", name:"Italian"},
    { key:"jpn", id:"505037985fe01ac20407b80b", name:"Japanese"},
    { key:"kor", id:"505037985fe01ac20407b80c", name:"Korean"},
    { key:"lit", id:"505037985fe01ac20407b80e", name:"Lithuanian"},
    { key:"nor", id:"505037985fe01ac20407b810", name:"Norwegian"},
    { key:"pus", id:"505037985fe01ac20407b811", name:"Pashto"},
    { key:"per", id:"505037985fe01ac20407b812", name:"Persian"},
    { key:"pol", id:"505037985fe01ac20407b813", name:"Polish"},
    { key:"por", id:"505037985fe01ac20407b814", name:"Portuguese"},
    { key:"rum", id:"505037985fe01ac20407b817", name:"Romanian"},
    { key:"rus", id:"505037985fe01ac20407b818", name:"Russian"},
    { key:"srp", id:"505037985fe01ac20407b819", name:"Serbian"},
    { key:"slo", id:"505037985fe01ac20407b81c", name:"Slovak"},
    { key:"slv", id:"505037985fe01ac20407b81d", name:"Slovenian"},
    { key:"som", id:"505037985fe01ac20407b81e", name:"Somali"},
    { key:"spa", id:"505037985fe01ac20407b81f", name:"Spanish", defaultLang: true},
    { key:"swe", id:"505037985fe01ac20407b822", name:"Swedish"},
    { key:"tha", id:"505037985fe01ac20407b823", name:"Thai"},
    { key:"tur", id:"505037985fe01ac20407b824", name:"Turkish"},
    { key:"ukr", id:"505037985fe01ac20407b9c1", name:"Ukrainian"},
    { key:"urd", id:"505037985fe01ac20407b825", name:"Urdu"}],
    
  defaultLang : function() {
    return this.filter(function(lang) { 
       return (lang['defaultLang']);
    });
  },
  
  defaultLangTranslation: function() {
    return this.filter(function(lang) { 
       return (lang['defaultLangTranslation']);
    });
  },
  
  filter: function(criteria) {
    for (var i=0; i<this.list.length; i++) {
      var lang = this.list[i];
      if (criteria(lang))
	return lang;
    }  
    return null;
  },
  
  getLang: function(id) {
    return this.filter(function(lang) { 
       return (lang['id']==id);
    });
  }
  
}  
  
  
  
  