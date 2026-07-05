const CACHE_NAME = "bureau-v2";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./config.js",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  const isStatic = STATIC_ASSETS.some((asset) => {
    const normalized = asset.replace("./", "");
    if (!normalized || normalized === "/") {
      return path.endsWith("/") || path.endsWith("/index.html");
    }
    return path.endsWith(`/${normalized}`) || path.endsWith(normalized);
  });

  if (!isStatic) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
    })
  );
});