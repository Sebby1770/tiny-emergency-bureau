/**
 * Offline support for the bureau desk.
 *
 * Strategy matters here. Until v6 every static asset was served cache-first,
 * including index.html and script.js, so a returning player kept running the
 * build they first visited: a shipped fix could not reach anyone whose browser
 * had already cached the old file, and only a CACHE_NAME bump ever dislodged
 * it. Documents and scripts are now network-first with a cache fallback, which
 * keeps the desk fully playable offline while letting a deploy actually land.
 */
const CACHE_NAME = "bureau-v6";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./config.js",
  "./bureau-engine.js",
  "./manifest.json"
];

/**
 * Paths served network-first.
 *
 * These are the files that carry game logic and markup, so a stale copy is a
 * stale *game*. The manifest is included because an out-of-date one keeps a
 * wrong icon or name pinned on an installed device.
 */
const NETWORK_FIRST = /\.(?:html|js|json)$|\/$/;

/** How long to wait for the network before falling back to cache. */
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

function isCacheable(response) {
  return response && response.status === 200 && response.type !== "opaque";
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    // A hung connection is worse than a slightly stale page, so cap the wait
    // rather than leaving the desk blank on a flaky network.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);
    let response;
    try {
      response = await fetch(request, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }

    if (isCacheable(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;

    // A navigation that misses both network and cache still has to render
    // something, so fall back to the shell.
    if (request.mode === "navigate") {
      const shell = await cache.match("./index.html");
      if (shell) return shell;
    }
    throw new Error("Offline and no cached copy available.");
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (isCacheable(response)) {
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isStatic = STATIC_ASSETS.some((asset) => {
    const normalized = asset.replace("./", "");
    if (!normalized || normalized === "/") {
      return url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
    }
    return url.pathname.endsWith(`/${normalized}`) || url.pathname.endsWith(normalized);
  });

  if (!isStatic && request.mode !== "navigate") return;

  if (request.mode === "navigate" || NETWORK_FIRST.test(url.pathname)) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
