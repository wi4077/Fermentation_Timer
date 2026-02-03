// Service Worker for Push Notifications
self.addEventListener('push', function (event) {
    const options = {
        body: event.data ? event.data.text() : '발효 단계가 완료되었습니다!',
        icon: '/Fermentation_Timer/Fermentation.png',
        badge: '/Fermentation_Timer/Fermentation.png',
        vibrate: [200, 100, 200, 100, 200],
        tag: 'fermentation-timer',
        requireInteraction: true,
        actions: [
            { action: 'open', title: '앱 열기' },
            { action: 'dismiss', title: '닫기' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('🍞 빵 발효 타이머', options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (event.action === 'dismiss') {
        return;
    }

    // 앱 열기 또는 기존 창으로 포커스
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function (clientList) {
                // 이미 열린 창이 있으면 포커스
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url.includes('/Fermentation_Timer/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // 없으면 새 창 열기
                if (clients.openWindow) {
                    return clients.openWindow('/Fermentation_Timer/');
                }
            })
    );
});

// Install event
self.addEventListener('install', function (event) {
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', function (event) {
    event.waitUntil(clients.claim());
});
