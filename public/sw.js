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
self.addEventListener('notificationclick',function(e){
    var notification=e.notification;
    var action=e.action;
    console.log(notification);
    if(action=='confirm'){
        console.log('confirm was chosen');
        notification.close();
    }else{
        e.waitUntil(
            clients.matchAll()
            .then(clis=>{
                var client=clis.find(c=>{
                    return c.visibilityState==='visible';
                });
                if (client!==undefined){
                    client.navigate(notification.data.openurl);
                    client.focus();
                }else{
                    clients.openWindow(notification.data.openurl);
                }
                notification.close();
            })
            )
    }

});
self.addEventListener('notificationclose',function(event){
    console.log('notification was close:',event)
})
self.addEventListener('push',event=>{
    console.log('push notification recive');
    var data={title:'', content:'',openurl:''};
    if(event.data){
        data=JSON.parse(event.data.text());
    }
    var option={
        body:data.content,
        icon:'/Rocket-icon-blue.png',
        image:'/Rocket-icon-blue.png',
        data:{
            openurl:data.openurl
        }
    };
    event.waitUntil(
        self.registration.showNotification(data.title,option)
    );
})

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
    if(e.tag=='bookmark'){
        console.log('sync!');
        var request = indexedDB.open("PostBookmark",1);
        request.onerror = function(event) {
            window.alert('index DB is wrong');
          };
        // nếu thành công
        request.onsuccess = function(event) {
            console.log("running onsuccess");
            db = event.target.result;
            readbookmark();
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
    function readbookmark(){
        var objectStore = db.transaction(["bookmark"],"readwrite").objectStore("bookmark");
        var postbookmark = [];
        objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            postbookmark.push(cursor.value);
            cursor.continue();
        }
        else {//sync bookmark and cache bookmark
            postbookmark.forEach(data=>{
                let urlpage='/Post/'+data.ppostid;
                let url='http://localhost:3001/post/load_post/'+data.ppostid+'/';
                fetch(url).then(res =>{
                    caches.open(cacheName)
                    .then(cache=>{
                        cache.put(url,res.clone())
                    })
                })
                fetch(urlpage).then(res =>{
                    caches.open(cacheName)
                    .then(cache=>{
                        cache.put(urlpage,res.clone())
                    })
                })
            });
            //Xoa indexdb
            var requestdelete=objectStore.clear();
            requestdelete.onsuccess=function(event){
                console.log('Xoa thanh cong');
             }
            requestdelete.onerror=function(){
                window.alert('xoa that bai');
             }
        }
    }
    }
})