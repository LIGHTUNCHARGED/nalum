// Service Worker for Push Notifications
const CACHE_NAME = 'nalum-v1';

// Install event
self.addEventListener('install', function(event) {
  console.log('🔧 Service Worker: Installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
  console.log('✅ Service Worker: Install complete');
});

// Activate event
self.addEventListener('activate', function(event) {
  console.log('⚡ Service Worker: Activating...');
  event.waitUntil(
    clients.claim()
  );
  console.log('✅ Service Worker: Activated and claimed clients');
});

// Push event
self.addEventListener('push', function(event) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔔 PUSH NOTIFICATION RECEIVED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const data = event.data ? event.data.json() : {};
  
  console.log('📦 Push Data:', data);
  console.log('   Title:', data.title || 'NSUT Alumni Network');
  console.log('   Body:', data.body || 'You have a new notification');
  console.log('   Icon:', data.icon || '/icon-192x192.png');
  console.log('   Action URL:', data.data?.url || '/');
  
  const options = {
    body: data.body || 'You have a new notification',
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/badge-72x72.png',
    data: data.data || {},
    requireInteraction: false,
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'NSUT Alumni Network', options)
      .then(() => {
        console.log('✅ Notification displayed successfully');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      })
      .catch((error) => {
        console.error('❌ Failed to show notification:', error);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      })
  );
});

// Notification click event
self.addEventListener('notificationclick', function(event) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👆 NOTIFICATION CLICKED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Notification Tag:', event.notification.tag);
  console.log('Target URL:', event.notification.data?.url || '/');
  
  event.notification.close();

  const urlToOpen = new URL(event.notification.data?.url || '/', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        console.log(`   Found ${clientList.length} open window(s)`);
        // Check if there's already a window open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            console.log('   ✅ Focusing existing window');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          console.log('   ✅ Opening new window');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          return clients.openWindow(urlToOpen);
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      })
  );
});
