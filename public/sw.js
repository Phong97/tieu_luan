const cacheName='v1';
var db;
const urlCache=[
    '/'
]
self.addEventListener('install',function(e){
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(urlCache);
        })
    )
})
// self.addEventListener(active)
self.addEventListener('fetch',function(e){
    var type=['image','style','script'];
    var request=e.request;
    console.log(request.destination);
    var findReponse=caches.open(cacheName)
    .then(cache=>cache.match(request))
    .then(response=>{
        if(response){
            return response;
        }else{//cache neu tap tin la image hoac cac file tinh
            if(type.includes(e.request.destination)){
                return fetch(request)
                .then(function(res){
                    return caches.open(cacheName)
                    .then (cache=>{
                     cache.put(e.request.url,res.clone());
                        return res;
                })
            })
            }else{
                return fetch(request);
            }
        }
    })
    e.respondWith(findReponse);
    
});

self.addEventListener('sync',function(e){
    if(e.tag==='submit'){
        console.log('sync!');
        var request = indexedDB.open("PostDatabase",6);
        request.onerror = function(event) {
            window.alert('index DB is wrong');
          };
        // nếu thành công
        request.onsuccess = function(event) {
            console.log("running onsuccess");
            db = event.target.result;
            readpost();
        };
    }
    function readpost(){
        db.transaction("posts").objectStore("posts").get("1").onsuccess = function(event) {
            let result=event.target.result;
            const data = {
                "title":result.title,
                "des": result.des,
                "content": result.content,
                "view" : 0,
                "category":parseInt(result.category),
                "user": parseInt(result.user),
                "state": 1,
                "img": result.img
              };
              let url='http://localhost:3001/post/upload';
              fetch(url,{
                  method:'POST',
                  body:JSON.stringify(data),
                  headers:{
                    'Content-Type': 'application/json'
                  }
              }).then(res => res)
              .then(response => console.log('Success:', response))
              .catch(error => console.error('Error:', error));
          };
    }
})