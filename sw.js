const cacheName = 'v1';

self.addEventListener('install', e => {
    console.log('Installed');
});

self.addEventListener('activate', e => {
    console.log('Activated');

    e.waitUntil(
        caches.keys()
        .then(cacheName => {
                return Promise.all(cacheName.map(cache => {
                    if (cache != cacheName){
                        return caches.delete(cache);
                    }
                }));
            }
        )
    )
});
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
        .then(response =>{
            const theclone = response.clone();
            caches.open(cacheName)
           .then(cache => {
             cache.put(e.request, theclone);
             console.log('Work')
           })
           return response;
        })
        .catch(err => caches.match(e.request).then(response => response))
    )
})