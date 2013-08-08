var on = false;

chrome.browserAction.onClicked.addListener(function(tab){

      
       if(on) {
         turnOff(tab.id);
       } else {
         chrome.browserAction.setIcon({path: 'icon.png'}); 
         turnOn(tab.id);
       }
});

function turnOn(tabId){

       chrome.tabs.executeScript(tabId, {file: "scrolling_on.js"});
       on = true;
       chrome.browserAction.setTitle({title:'Running...'});
       chrome.tabs.sendRequest(tabId,{}); 
};

function turnOff(tabId) {

       chrome.tabs.executeScript(tabId, {file: "scrolling_off.js"});
       on = false;
       chrome.browserAction.setTitle({title:'Break...'});
       chrome.browserAction.setIcon({path:'icon.png'});
};

chrome.tabs.onRemoved.addListener(function(tabId){
       turnOff(tabId);  
});

function drawButton(percent) {

       var canvas = document.getElementById("canvas"),
           context = canvas.getContext('2d'); 
           context.clearRect(0,0,19,19);
           context.font = '16px Georgia'; 
           context.fillStyle = 'blue';
           context.fillText(percent,0,15);

       return context.getImageData(0,0,19,19);    
};

chrome.extension.onRequest.addListener(function(req, sender, response){

       var percent = req.percentage,
           imageData = drawButton(percent); 

       chrome.browserAction.setIcon({imageData: imageData}); 
});