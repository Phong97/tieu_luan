const cacheName='v1';
var db;
const urlCache=[
    '/',
    ///index.html',
   
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
    var request=e.request;
    var findReponse=caches.open(cacheName)
    .then(cache=>cache.match(request))
    .then(response=>{
        if(response){
            return response;
        }
        return fetch(request);
    })
    e.respondWith(findReponse);
    
});

self.addEventListener('sync',function(e){
    if(e.tag==='submit'){
        console.log('sync!');
        var request = indexedDB.open("MyTestDatabase",6);
        request.onerror = function(event) {
            window.alert('index DB is wrong');
          };
        // nếu thành công
        request.onsuccess = function(event) {
            console.log("running onsuccess");
            db = event.target.result;
            readper();
        };
    }
    function readper(){
        var transaction = db.transaction(["customers"]);
        var objectStore = transaction.objectStore("customers");
        var request = objectStore.get("444-44-4444");
        request.onerror = function(event) {
            // Handle errors!
            };
        request.onsuccess = function(event) {
        // Do something with the request.result!
        console.log("Name for SSN 444-44-4444 is " + request.result.ssn);
    };
    }
})