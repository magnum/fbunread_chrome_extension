    chrome.tabs.sendRequest(tabId, 
        {"type": "consoleLog", "value": "message"}); 

        alert("test");