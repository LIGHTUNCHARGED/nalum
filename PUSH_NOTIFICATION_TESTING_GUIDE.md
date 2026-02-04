# Push Notification Testing Guide

## 📋 Overview
This guide helps you test push notifications with detailed logging indicators at every step.

## 🔍 What to Look For

### Backend Logs (Node Terminal)
When a notification is created, you'll see:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📬 NOTIFICATION CREATION STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: new_message
Recipient ID: 507f1f77bcf86cd799439011
Sender ID: 507f191e810c19729de860ea
Title: New Message
Message: John Doe: Hello there!
Priority: high
Action URL: /dashboard/chat?conversation=...
Metadata: {
  "senderId": "...",
  "messageId": "...",
  ...
}
```

Then you'll see each delivery channel attempt:

#### 1. In-App Notification
```
📱 Sending In-App Notification...
In-App Status: ✅ Sent
```

#### 2. Push Notification (THE KEY ONE FOR TESTING)
```
🔔 Sending Push Notification...
   🔍 Looking for active push subscriptions...
   📊 Found 1 active subscription(s)
   Subscription 1: {
     browser: 'Chrome',
     os: 'Windows',
     endpoint: 'https://fcm.googleapis.com/fcm/send/...',
     createdAt: 2026-02-02T...
   }
   📦 Push Payload: {"title":"New Message","body":"John: Hello!","icon":...}
   📤 Sending to subscription 1...
   ✅ Subscription 1 - Sent successfully
   📊 Push Results: 1/1 successful
Push Status: ✅ Sent
```

#### 3. Final Summary
```
📊 DELIVERY SUMMARY: { inApp: true, push: true, email: false }
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Frontend Logs (Browser Console - F12)

#### When Enabling Push Notifications
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 PUSH NOTIFICATION SUBSCRIPTION STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Step 1: Requesting notification permission...
✅ Permission granted

🧹 Step 2: Cleaning up existing service workers...
   Found 0 existing registration(s)

📝 Step 3: Registering new service worker...
✅ Service worker registered
   Scope: https://yoursite.com/
   Active: true

⏳ Step 4: Waiting for service worker to be ready...
✅ Service worker ready

🔑 Step 5: Fetching VAPID public key from server...
✅ VAPID key received
   Key (first 50 chars): BNVnOzUinZ...

🔔 Step 6: Subscribing to push manager...
✅ Push subscription successful
   Endpoint: https://fcm.googleapis.com/fcm/send/...

📤 Step 7: Sending subscription to server...
✅ Subscription saved to server
   Browser: Chrome
   OS: Windows

🎉 PUSH NOTIFICATION SUBSCRIPTION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### When a Push Notification Arrives (Service Worker Console)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 PUSH NOTIFICATION RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Push Data: {...}
   Title: New Message
   Body: John Doe: Hello there!
   Icon: /icon-192x192.png
   Action URL: /dashboard/chat?conversation=...
✅ Notification displayed successfully
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### When Clicking a Notification
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👆 NOTIFICATION CLICKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Notification Tag: default
Target URL: /dashboard/chat?conversation=...
   Found 1 open window(s)
   ✅ Focusing existing window
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🧪 Testing Steps

### 1. Enable Push Notifications
1. Go to `/dashboard/notifications` on mobile
2. Look for the blue banner "Enable Push Notifications"
3. Click "Enable" button
4. **Check Browser Console (F12)** - You should see the 7-step subscription process
5. **Check Node Terminal** - You should see the subscription being saved

### 2. Test with a Message
1. Have another user send you a message
2. **IMPORTANT**: Close the app tab or minimize the browser
3. **Check Node Terminal** - Look for notification creation logs
4. **You should see a system notification** pop up on your OS (Windows notification, etc.)
5. **Check Service Worker Console** (F12 → Application → Service Workers → Console) - Look for push received logs

### 3. Verify Push Was Sent
In the Node terminal, look for:
```
🔔 Sending Push Notification...
   📊 Found X active subscription(s)
   ✅ Subscription 1 - Sent successfully
Push Status: ✅ Sent
```

## ❌ Troubleshooting

### No Push Subscriptions Found
```
⚠️  No active push subscriptions found
Push Status: ❌ Failed
```
**Fix**: Go to notifications page and click "Enable Push Notifications"

### Permission Denied
```
❌ Notification permission not granted
   Current permission state: denied
```
**Fix**: 
1. Click the lock icon in address bar
2. Find "Notifications" permission
3. Change to "Allow"
4. Refresh page

### Service Worker Not Registering
```
❌ ERROR SUBSCRIBING TO PUSH:
Error details: { name: 'SecurityError', message: '...' }
```
**Fix**: Must use HTTPS or localhost (HTTP won't work)

### Push Sent but Not Received
- Check if browser is in Focus (push notifications don't show when app is open and focused)
- Close the app tab completely
- Check system notification settings (Windows/Mac)
- Try a different browser

### Subscription Expired
```
⚠️  Subscription 1 - Expired/Invalid (410), deactivating...
```
**Fix**: Re-enable push notifications from the notifications page

## 📊 Status Indicators on Notifications Page

You'll see one of these banners:

### 🟡 Yellow - Not Supported
```
"Push Notifications Not Supported"
"Your browser doesn't support push notifications..."
```
**Meaning**: Browser/device doesn't support push (e.g., iOS Safari)

### 🔴 Red - Blocked
```
"Push Notifications Blocked"
"You've blocked push notifications..."
```
**Meaning**: User previously denied permission

### 🟢 Green - Enabled
```
"Push Notifications Enabled"
"You'll receive push notifications..."
```
**Meaning**: Everything working!

### 🔵 Blue - Prompt to Enable
```
"Enable Push Notifications"
"Stay updated with real-time notifications..."
```
**Meaning**: Ready to enable (permission = 'default')

## 🔧 Quick Debug Checklist

- [ ] HTTPS or localhost? (Required)
- [ ] Permission granted? (Check browser address bar)
- [ ] Service worker registered? (F12 → Application → Service Workers)
- [ ] Subscription saved? (Check backend logs)
- [ ] Browser closed/minimized? (Push won't show when app is focused)
- [ ] System notifications enabled? (Check OS settings)
- [ ] VAPID keys configured? (Check .env file)

## 📝 Expected Log Flow

**When a message is sent:**
1. Backend: `📬 NOTIFICATION CREATION STARTED`
2. Backend: `🔔 Sending Push Notification...`
3. Backend: `✅ Subscription 1 - Sent successfully`
4. Service Worker: `🔔 PUSH NOTIFICATION RECEIVED`
5. Service Worker: `✅ Notification displayed successfully`
6. OS: System notification appears 🎉

**When you click it:**
1. Service Worker: `👆 NOTIFICATION CLICKED`
2. Browser: Opens/focuses the app
3. App: Navigates to the action URL
