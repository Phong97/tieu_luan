if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js',{scope:'/'})
    .then(function(reg){
        console.log('Registion succeed. Scope is '+reg.scope);
    }).catch(function(error){
        console.log('Registration faied with' + error)
    });
    //register sync
    Notification.requestPermission(permission=>{
        console.log('permission:',permission)
    })
}