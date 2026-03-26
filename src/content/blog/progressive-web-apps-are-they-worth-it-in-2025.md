---
title: "Progressive Web Apps: Are They Worth It in 2025?"
excerpt: "PWAs promised the best of both worlds — web reach with app-like experience. Five years in, here's an honest assessment of where they deliver and where they still fall short."
category: "web-development"
tags: ["pwa", "progressive-web-apps", "mobile-development", "service-workers", "web-performance"]
date: "2025-01-10"
author: "m-faizan-rafiq"
lastModified: "2025-01-10"
featured: true
faqs:
  - question: "Can PWAs access device hardware like cameras and Bluetooth?"
    answer: "Yes, to a growing extent. Modern browsers support camera access, geolocation, Bluetooth, NFC, and even USB through web APIs. However, support varies by browser and platform. Chrome on Android has the broadest support, while Safari on iOS still restricts several APIs. Always check browser compatibility for the specific features you need."
  - question: "Do PWAs work on iOS?"
    answer: "They work, but with limitations. Safari supports service workers and the Web App Manifest, so PWAs can be installed and work offline on iOS. However, iOS restricts push notifications for PWAs added to home screen, limits background sync, and caps offline storage at around 50MB. Apple has been slowly improving support, but iOS remains the weakest platform for PWAs."
  - question: "Are PWAs good for SEO?"
    answer: "Yes, actually. Since PWAs are fundamentally websites, they're fully indexable by search engines. This is a major advantage over native apps, which live in app stores but aren't discoverable through search. A well-built PWA with server-side rendering gets all the SEO benefits of a traditional website plus the engagement benefits of an app-like experience."
---

I've been building PWAs since before most developers knew what a service worker was. The promise was intoxicating: build once for the web, get native app-like performance and features, skip the app stores entirely. We were going to make native apps obsolete.

Well, it's 2025. Native apps are very much alive. But PWAs have carved out their own territory, and it's bigger than the skeptics predicted. Let me break down where we actually stand.

## What Makes a PWA a PWA

Let's get the basics straight. A Progressive Web App isn't a framework or a library. It's a set of capabilities added to a regular website:

- **Service Workers** — Background scripts that enable offline functionality, caching, and push notifications
- **Web App Manifest** — A JSON file that tells the browser how to display the app when installed (name, icon, colors, display mode)
- **HTTPS** — Required for service workers to function (which you should be doing anyway)
- **Responsive Design** — Adapting to any screen size

That's it. A PWA is a website that meets these criteria. You can progressively enhance any existing website into a PWA. The "progressive" part means users on capable browsers get enhanced features while everyone else still gets a functional website.

## Where PWAs Genuinely Shine

**Content-heavy applications.** News sites, blogs, documentation, e-commerce catalogs — PWAs are exceptional here. They load fast, work offline, and can be installed without app store friction. Some major publications have seen significant engagement increases after launching PWAs, with faster load times and improved user retention.

**Internal business tools.** This is the sleeper use case that doesn't get enough attention. Your company's inventory management system, CRM dashboard, or field service application doesn't need to be in the App Store. A PWA gives you cross-platform compatibility, instant updates (no app store review process), and offline capability for field workers. We've built several of these, and the total cost of ownership is dramatically lower than maintaining native apps for iOS and Android.

**Emerging markets.** In regions with slower networks, limited storage space, and data caps, PWAs are transformative. A typical native app is 50-150MB. A PWA might be 1-2MB. That matters when your users are on 2G networks with 8GB phones.

**E-commerce.** Product browsing, cart management, checkout flows — these work beautifully as PWAs. Users can install the shopping experience on their home screen without the commitment of downloading an app. Several major retailers have reported conversion rate improvements after PWA adoption.

## Where PWAs Still Struggle

I'm not going to pretend everything's perfect. There are real limitations.

**iOS support remains frustrating.** Apple has improved PWA support over the years, but it still lags behind Android significantly. Push notification support has improved, but there are still restrictions. Storage limits are tighter. Background sync is limited. If your primary audience uses iPhones, you need to carefully evaluate whether these limitations will impact your user experience.

**No app store presence.** This is both a feature and a bug. Yes, you avoid the 30% app store cut and the review process. But you also lose discoverability. Many users still search for apps in the App Store or Google Play, not on the web. You can list PWAs on the Google Play Store using Trusted Web Activities, but there's no equivalent for Apple's App Store.

**Complex device integrations.** If you need deep system integrations — health kit data, Siri shortcuts, widgets, always-on background processing — native is still the way to go. Web APIs are catching up, but there's a meaningful gap for hardware-intensive use cases.

**Performance ceiling.** For computationally intensive applications — games, video editors, 3D rendering — native still wins on raw performance. WebAssembly is closing this gap, but it hasn't closed it yet.

## The Service Worker: Your PWA's Engine

The service worker is where the magic happens, and it's also where most developers make mistakes. Let me walk through the critical patterns.

**Caching strategy matters.** There's no one-size-fits-all approach:

- **Cache First** — Serve from cache, fall back to network. Great for static assets that rarely change.
- **Network First** — Try the network, fall back to cache. Best for dynamic content that should be fresh when possible.
- **Stale While Revalidate** — Serve from cache immediately, then update the cache from the network in the background. The sweet spot for content that changes but doesn't need to be real-time.

```javascript
// Stale-while-revalidate example
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('dynamic-v1').then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

**Cache versioning is non-negotiable.** When you deploy updates, old caches need to be cleaned up. Name your caches with version numbers and delete old versions in the `activate` event.

**Don't cache everything.** Cache your app shell, critical assets, and key API responses. Don't cache user-specific data (security risk) or rapidly changing content (freshness issues). Be strategic.

## The Installation Experience

Here's something many developers overlook: the install prompt matters enormously. Browsers show their own generic install banners, but you can create a much better experience by handling the `beforeinstallprompt` event.

Don't show the install prompt immediately. Wait until the user has engaged with your content. Someone who's visited three pages and spent five minutes on your site is far more likely to install than someone who just landed on your homepage.

Track installation rates. If less than 2-3% of eligible users are installing, experiment with your prompt timing, messaging, and placement. We've seen installation rates jump by 3-4x just by changing when and how the prompt appears.

## Offline Experience Design

Going offline isn't just about caching pages. It's about designing an experience that makes sense without a network connection.

Bad offline experience: user taps a link, sees a browser error page.

Good offline experience: user taps a link, sees your custom offline page explaining they're offline and showing cached content they can browse.

Great offline experience: user continues using the app normally, changes are queued locally and synced when connectivity returns.

The "great" level requires Background Sync API support and careful conflict resolution logic. It's more work, but for applications where users might frequently lose connectivity (field service, travel, warehouse management), it's worth every hour of development time.

## Performance: The PWA Advantage

PWAs have a structural performance advantage over native apps for one reason: the app shell architecture.

Your app shell — the minimal HTML, CSS, and JavaScript needed to power the interface — gets cached on the first visit. Subsequent loads pull the shell from cache (instant) and only fetch new content from the network. This can make your PWA feel faster than a native app because there's zero startup overhead after the first visit.

Combine this with:
- **Preloading** — Fetch content the user is likely to need next
- **Lazy loading** — Only load images and components when they're needed
- **Code splitting** — Don't ship JavaScript the user won't use on the current page
- **Image optimization** — WebP/AVIF formats with responsive sizing

A well-built PWA on a modern device is genuinely indistinguishable from a native app in terms of perceived performance. The key word is "well-built." A poorly optimized PWA will feel sluggish regardless of the technology.

## When to Choose PWA vs Native vs Hybrid

After building all three types for years, here's my decision framework:

**Choose PWA when:**
- Content consumption is the primary use case
- Cross-platform reach matters more than platform-specific features
- You want to avoid app store dependencies
- Your team is primarily web developers
- Budget constraints make maintaining native apps impractical
- Rapid iteration and instant deployment are priorities

**Choose Native when:**
- You need deep hardware integration (AR, health sensors, system-level features)
- Maximum performance is critical (gaming, video processing)
- App store discoverability is important for your acquisition strategy
- Your users expect platform-specific design patterns

**Choose Hybrid (React Native, Flutter) when:**
- You need native capabilities but want to share code across platforms
- App store presence is required but budget doesn't support separate native teams
- Your feature set falls between what PWAs and native can deliver

## The Verdict for 2025

Are PWAs worth it? Yes — for the right use cases. They're not a universal replacement for native apps, and anyone who tells you otherwise is selling something. But they've proven their value for content apps, e-commerce, internal tools, and applications targeting emerging markets.

The technology has matured significantly. Service workers are reliable. Browser support is broad (with the iOS asterisk). The tooling is excellent. And the development and maintenance cost savings compared to native are real and substantial.

If your application's core value can be delivered through a browser, start with a PWA. You can always add a native app later if specific platform features demand it. But you might find you never need to.
