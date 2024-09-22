const CACHE_STATIC_NAME = "static-v1";
const CACHE_DYNAMIC_NAME ="dynamic-v1";

self.addEventListener("install",function(event){
    console.log("[sw.js] Service Worker installing...", event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(function (cache)
        {
            console.log("[sw.js] Cache opened. Caching App Shell...");
            cache.addAll([
                "/",
                "/index.html",
                "/js/app.js",
                "/manifest.json"
            ]);
        })
    );
});

self.addEventListener("activate",function (event){
    console.log("[sw.js] Service Working activating", event);
});

self.addEventListener("fetch",function (event){
    console.log("[sw.js] Fetching...", event);
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                console.log("[sw.js] Found in cache!", event.request.url);
                return response
            }
            console.log("[sw.js] Not found in cache. Fetching from network...", event.request.url);
            return fetch(event.request).then(function(res){

                const networkResponseClone = res.clone();

                caches.open(CACHE_DYNAMIC_NAME).then(function(dynamicCache) {
                    dynamicCache.put(event.request, networkResponseClone);
                });

                return res;
 
            });
        })
    )
});
 