importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.4.0/workbox-sw.js'
);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

const unauthenticatedApiCallsToCache = ["/api/links", "/api/inputs", "/api/regex_options"]
const authenticatedApiCallsToCache = ["/api/forms/me"]

const cacheFirstStrategy = new CacheFirst({
    cacheName: "cacheFirst",
    plugins: [
        new CacheableResponsePlugin({
            statuses: [200]
        })
    ]
})

const networkFirstUnauthenticatedStrategy = new NetworkFirst({
    cacheName: "unauthenticatedApi",
    plugins: [
        new CacheableResponsePlugin({
            statuses: [200]
        })
    ]
})

const networkFirstAuthenticatedStrategy = new NetworkFirst({
    cacheName: "authenticatedApi",
    plugins: [
        new CacheableResponsePlugin({
            statuses: [200]
        })
    ]
})

self.addEventListener("message", event => {
    if (event.data?.type === 'LOGOUT') {
        event.waitUntil(caches.delete("authenticatedApi"));
    }
})


registerRoute(( {request} ) => request.mode === 'navigate', cacheFirstStrategy);
registerRoute(( {request} ) => request.destination === 'script', cacheFirstStrategy);
registerRoute(( {url, request} ) => request.method === 'GET' && url.origin === self.location.origin 
                && unauthenticatedApiCallsToCache.includes(url.pathname), networkFirstUnauthenticatedStrategy);

registerRoute(( {url, request} ) => request.method === 'GET' && url.origin === self.location.origin
                && authenticatedApiCallsToCache.includes(url.pathname), networkFirstAuthenticatedStrategy);
