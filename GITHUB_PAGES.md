# نشر مهنتي على GitHub Pages

تم تجهيز المشروع للنشر التلقائي عبر GitHub Actions.

## الإعداد الأولي

1. ارفع المشروع إلى مستودع GitHub على الفرع `main`.
2. من إعدادات المستودع افتح **Settings → Pages**.
3. في **Build and deployment** اختر **GitHub Actions** كمصدر النشر.
4. ادفع أي تغيير إلى `main` أو شغّل workflow يدوياً من تبويب **Actions**.

سيقوم workflow بتثبيت الاعتمادات، فحص TypeScript، بناء النسخة الثابتة، ثم نشر مجلد `dist/public` على GitHub Pages.

## ملاحظات مهمة

- تم ضبط `base` في `vite.config.ts` تلقائياً على اسم المستودع عند البناء داخل GitHub Actions، لذلك يعمل الموقع مع Project Pages مثل `https://username.github.io/repository-name/`.
- المعاينة المحلية ومشروع WebDev يستمران باستخدام المسار `/`.
- المشروع الحالي واجهة ثابتة؛ النماذج والتفاعلات الموجودة تعمل كنموذج Frontend وتحتاج Backend عند تحويلها إلى خدمة حقيقية.
- الصور الحالية محملة من Unsplash عبر روابط عامة، ويمكن استبدالها لاحقاً بأصول مستضافة داخل GitHub أو CDN خاص.
