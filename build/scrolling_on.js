var storiesCount = 0;
var maxStoryId = "";

getMaxStoryId();

function getMaxStoryId() {
  chrome.storage.local.get('maxStoryId', function(items) {
    console.log(items);
    if(items && items.maxStoryId) maxStoryId = items.maxStoryId;
  });
}

function setMaxStoryId(storyId) {
  maxStoryId = storyId;
  chrome.storage.local.set({'maxStoryId': storyId}, function() {
    console.log("maxStoryId: "+storyId);
  });
  

}

function handleScroll(event) {
   var area = document.documentElement.scrollHeight - window.innerHeight;
   var p = document.body.scrollTop / area * 100;
   if(p < 10) p = '0' + p;
   //if(p == 100 || p == '00')  p = '----'; 


   var text = parseInt(p)+"%";

   // 3485357088487255021
   // 8672553131706298344
   // 7007246515442603034
   // 4102726002892493403
   // 8870945832669857183
   // stream_story_520e512133e078010077115

   /**/
   var stories = document.getElementsByClassName("genericStreamStory");
   var stories_array = Array.prototype.slice.call(stories);
   if (stories_array.length > storiesCount) {
      var stories_chunk = stories_array.slice(storiesCount);
      console.log("Parsing last "+stories_chunk.length+" of "+stories_array.length);
      for(var i=0; i<stories_chunk.length; i++) {
        var story = stories_chunk[i];
        var id = story.getAttribute("id");
        var json = JSON.parse(story.getAttribute("data-ft"));
        //console.log(json);
        if(id && json) {
          //var storyId =  id.replace("stream_story_","");
          var storyId =  json.mf_story_key; //.replace("-","");
          if (storyId > maxStoryId) {
            setMaxStoryId(storyId);       
          } else {
            story.style.border = "3px solid red"; // #TODO have to find a way to check story date, now trying with mf_story_key
          }
          
        }

      }
      storiesCount = stories.length;
   }

   chrome.extension.sendRequest({text: text});  
};

chrome.extension.onRequest.addListener(function(req, sender, response){
      handleScroll({});
});  
document.addEventListener('scroll', handleScroll);