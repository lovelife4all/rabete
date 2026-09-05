# رابطه‌ی عاشقانه — نسخه‌ی HTML استاتیک

خروجی ایستای سایت [@rabeteh.agahane](https://instagram.com/rabeteh.agahane) — بدون سرور و دیتابیس، آماده‌ی GitHub Pages.
این نسخه برای آدرس **https://lovelife4all.github.io/rabete/** ساخته شده (همه‌ی لینک‌ها پیشوند `/rabete/` دارند).

## ساختار
| مسیر | توضیح |
|---|---|
| `index.html` | خانه |
| `lessons/` + `lessons/<slug>/` | ۸ درس کامل + فهرست با جست‌وجوی سمت مرورگر |
| `lessons/topic/<cat>/` | فیلتر ۵ موضوع |
| `quiz/` + `quiz/<slug>/` | ۲ تست تعاملی با امتیازدهی خودکار در مرورگر |
| `reels/`, `consult/`, `about/` | آرشیو ریلز، مشاوره، درباره |
| `register/`, `login/` | نمایشی (فرم غیرفعال + پیام) |
| `404.html` | صفحه‌ی پیدا نشد |
| `assets/` | `site.css` + `site.js` (منو، جست‌وجو، موتور تست) |
| `images/`, `fonts/` | تصاویر برند + فونت وزیرمتن (بدون CDN خارجی) |
| `sitemap.xml`, `robots.txt`, `.nojekyll` | سئو و تنظیم Pages |

## انتشار
همه‌ی فایل‌ها و پوشه‌های همین مخزن باید در ریشه‌ی شاخه‌ی `main` باشند؛ سپس Settings → Pages → Branch: `main` / `(root)`.

## بازتولید از سایت اصلی (Next.js)
```bash
cd website/web
npx next build && npx next start -p 3000 &
node scripts/export-static.mjs --out ../static-site --prefix /rabete --site https://lovelife4all.github.io
```
هر تغییری در پنل ادمین (درس/تست/ریلز جدید) با اجرای دوباره‌ی همین دستور به نسخه‌ی استاتیک می‌رسد.

## محدودیت‌ها
حساب کاربری، ذخیره‌ی نتیجه، تفسیر کامل تست و رزرو مشاوره به سرور نیاز دارند → فاز ۶ (نسخه‌ی کامل). نتیجه‌ی تست فقط در مرورگر کاربر می‌ماند.
