var on = false;
chrome.browserAction.onClicked.addListener(function(tab){
       if(on) {
         turn_off(tab.id);
       } else {
         chrome.browserAction.setIcon({path: 'icon.png'}); 
         turn_on(tab.id);
       }
});

function turn_on(tabId){
       chrome.tabs.executeScript(tabId, {file: "scrolling_on.js"});
       on = true;
       chrome.browserAction.setTitle({title:'Running...'});
       chrome.tabs.sendRequest(tabId,{}); 
};

function turn_off(tabId) {

       chrome.tabs.executeScript(tabId, {file: "scrolling_off.js"});
       on = false;
       chrome.browserAction.setTitle({title:'Break...'});
       chrome.browserAction.setIcon({path:'icon.png'});
};

chrome.tabs.onRemoved.addListener(function(tabId){
       turnOff(tabId);  
});

function getStories() {
  var stories = $("li.uiStreamStory");
  return stories;
}

function draw_button(text) {

       var elem = document.createElement('canvas');
       elem.setAttribute('id', 'canvas');
       elem.setAttribute('width', 19);
       elem.setAttribute('height', 19);

       var canvas = elem;
           context = canvas.getContext('2d'); 
           context.clearRect(0,0,19,19);
           context.font = '10px Arial'; 
           context.fillStyle = 'black';
           context.fillText(text,0,15);
       return context.getImageData(0,0,19,19);    
};

chrome.extension.onRequest.addListener(function(req, sender, response){
       var text = req.text,
           imageData = draw_button(text); 
       chrome.browserAction.setIcon({imageData: imageData}); 
});