# رابطه‌ی عاشقانه — نسخه‌ی HTML استاتیک

خروجی ایستای سایت [@rabeteh.agahane](https://instagram.com/rabeteh.agahane) — بدون سرور، بدون دیتابیس، آماده‌ی GitHub Pages.

## چی داخلشه
| مسیر | توضیح |
|---|---|
| `index.html` | خانه |
| `lessons/` + `lessons/<slug>/` | ۸ درس کامل + فهرست با جست‌وجوی سمت مرورگر |
| `lessons/topic/<cat>/` | فیلتر ۵ موضوع |
| `quiz/` + `quiz/<slug>/` | ۲ تست تعاملی با **امتیازدهی خودکار در مرورگر** (خلاصه‌ی نتیجه برای همه؛ تفسیر کامل مخصوص نسخه‌ی کامل سایت) |
| `reels/`, `consult/`, `about/` | آرشیو ریلز، مشاوره، درباره |
| `register/`, `login/` | نمایشی (فرم غیرفعال + پیام) |
| `404.html` | صفحه‌ی پیدا نشد (GitHub Pages خودکار استفاده می‌کند) |
| `assets/site.css`, `assets/site.js` | یک فایل استایل + یک اسکریپت ۴ کیلوبایتی (منو، جست‌وجو، موتور تست) |
| `images/`, `fonts/` | ۱۵ تصویر برند + فونت وزیرمتن (بدون CDN خارجی) |
| `sitemap.xml`, `robots.txt`, `.nojekyll` | سئو و تنظیم Pages |

## انتشار روی GitHub Pages (۳ دقیقه)
1. یک مخزن بساز، مثلاً `rabeteh-agahane.github.io` (برای آدرس ریشه) — یا هر نام دیگری (زیرمسیر).
2. محتوای همین پوشه را در شاخه‌ی `main` push کن (فایل `.github/workflows/pages.yml` همراهش هست).
3. در Settings → Pages، گزینه‌ی **Source: GitHub Actions** را انتخاب کن. با هر push، سایت خودکار منتشر می‌شود.

> اگر مخزن زیرمسیر دارد (مثلاً `username.github.io/rabeteh`)، خروجی را با پیشوند بساز:
> `node scripts/export-static.mjs --prefix /rabeteh --site https://username.github.io`

## بازتولید از سایت Next
```bash
cd website/web
npx next build && npx next start -p 3000 &   # سرور کامل
node scripts/export-static.mjs --out ../static-site
```
هر تغییری که در پنل ادمین بدهی (درس/تست/ریلز جدید)، با اجرای دوباره‌ی همین دستور به نسخه‌ی استاتیک می‌رسد.

## محدودیت‌های نسخه‌ی استاتیک
- حساب کاربری، ذخیره‌ی نتیجه در حساب، تفسیر کامل تست و رزرو مشاوره به سرور نیاز دارند → در فاز ۶ با انتخاب هاست، نسخه‌ی کامل (Next.js) مستقر می‌شود.
- نتیجه‌ی تست فقط در مرورگر کاربر (`localStorage`) می‌ماند.
