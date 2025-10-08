# راهنمای استقرار برنامه فُؤاد

## 🚀 استقرار وب

### **گزینه 1: Expo Web (توصیه شده)**

```bash
# نصب وابستگی‌ها
npm install

# اجرای برنامه برای وب
npx expo start --web
```

### **گزینه 2: Build برای Production**

```bash
# ساخت فایل‌های تولید
npx expo build:web

# فایل‌های تولید در پوشه web-build قرار می‌گیرند
```

### **گزینه 3: استقرار روی Netlify**

1. پروژه را روی GitHub آپلود کنید
2. به Netlify متصل شوید
3. تنظیمات Build:
   - Build command: `npx expo build:web`
   - Publish directory: `web-build`

### **گزینه 4: استقرار روی Vercel**

1. پروژه را روی GitHub آپلود کنید
2. به Vercel متصل شوید
3. تنظیمات خودکار Expo را انتخاب کنید

## 📱 استقرار موبایل

### **Android**

```bash
# ساخت APK
npx expo build:android

# یا استفاده از EAS Build
npx eas build --platform android
```

### **iOS**

```bash
# ساخت برای iOS
npx expo build:ios

# یا استفاده از EAS Build
npx eas build --platform ios
```

## 🌐 استقرار روی سرور

### **Docker**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "expo", "start", "--web"]
```

### **Nginx Configuration**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 تنظیمات محیط

### **متغیرهای محیطی**

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.fouad-app.com
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_ENVIRONMENT=production
```

### **تنظیمات Firebase (اختیاری)**

```bash
# نصب Firebase
npm install firebase

# تنظیمات در firebase.config.js
```

## 📊 مانیتورینگ

### **Analytics**

```bash
# نصب Expo Analytics
npm install @expo/analytics
```

### **Error Tracking**

```bash
# نصب Sentry
npm install @sentry/react-native
```

## 🔒 امنیت

### **HTTPS**

- استفاده از SSL Certificate
- تنظیم HSTS Headers
- Content Security Policy

### **API Security**

- Rate Limiting
- Authentication
- Input Validation

## 📈 بهینه‌سازی

### **Performance**

```bash
# Bundle Analyzer
npx expo export --platform web --dev false

# Image Optimization
npx expo install expo-image
```

### **SEO**

```html
<!-- در index.html -->
<meta name="description" content="برنامه آزمون قرآن و تفسیر فُؤاد">
<meta name="keywords" content="قرآن, تفسیر, آزمون, مذهبی">
<meta property="og:title" content="فُؤاد - طرح قرآنی">
<meta property="og:description" content="برنامه آزمون قرآن و تفسیر">
```

## 🚨 عیب‌یابی

### **مشکلات رایج**

1. **خطای CORS**: تنظیم Headers مناسب
2. **خطای Font**: بررسی مسیر فونت‌ها
3. **خطای Navigation**: بررسی Route Names

### **Logs**

```bash
# مشاهده Logs
npx expo logs

# Debug Mode
npx expo start --dev-client
```

## 📋 چک‌لیست استقرار

- [ ] تست کامل برنامه
- [ ] بهینه‌سازی تصاویر
- [ ] تنظیم متغیرهای محیطی
- [ ] پیکربندی HTTPS
- [ ] تست عملکرد
- [ ] Backup داده‌ها
- [ ] مانیتورینگ خطاها

## 🔄 به‌روزرسانی

### **Version Control**

```bash
# Tag کردن نسخه
git tag v1.0.0
git push origin v1.0.0
```

### **Rollback**

```bash
# بازگشت به نسخه قبلی
git checkout v0.9.0
npx expo build:web
```

---

**نکته**: همیشه قبل از استقرار، برنامه را در محیط تست بررسی کنید.
