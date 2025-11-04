# ✅ רשימת בדיקה - העלאת Dashboard

## לפני העלאה לגיטהאב

- [ ] כל הקבצים בתיקייה (לא הזיפ!)
- [ ] `.gitignore` קיים
- [ ] `package.json` תקין
- [ ] `vercel.json` קיים
- [ ] `README.md` מעודכן

## העלאה לגיטהאב

### אופציה A: דרך הממשק (מומלץ למתחילים)
- [ ] יצרת repository חדש ב-https://github.com/new
- [ ] לא סימנת "Initialize with README"
- [ ] העלית את כל התיקייה (לא הזיפ!)
- [ ] הקבצים נראים בגיטהאב

### אופציה B: דרך Terminal
- [ ] פתחת Terminal בתיקיית הפרויקט
- [ ] הרצת: `bash deploy.sh`
- [ ] או ידנית:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin YOUR_REPO_URL
  git push -u origin main
  ```

## חיבור ל-Vercel

- [ ] נכנסת ל-https://vercel.com
- [ ] התחברת עם GitHub
- [ ] לחצת "Add New Project"
- [ ] בחרת את ה-repository
- [ ] Vercel זיהה Vite אוטומטית
- [ ] לחצת "Deploy"
- [ ] קיבלת URL (לדוגמה: `xxx.vercel.app`)

## בדיקת הדאשבורד

- [ ] הדאשבורד נטען ב-URL של Vercel
- [ ] כל הסטיילים נראים תקין
- [ ] אין שגיאות בקונסול (F12)
- [ ] עובד במובייל (בדוק ב-Chrome DevTools)

## שילוב ב-WordPress

- [ ] העתקת את ה-URL מ-Vercel
- [ ] פתחת עמוד חדש ב-WordPress
- [ ] הוספת Elementor HTML Widget
- [ ] הדבקת אחת מהדוגמאות מ-`WORDPRESS_INTEGRATION.html`
- [ ] החלפת `YOUR-PROJECT-URL` ב-URL האמיתי
- [ ] שמרת ופרסמת
- [ ] בדקת שה-iframe מופיע

## אופציונלי - הגבלת גישה

- [ ] הוספת בדיקת `is_user_logged_in()` (אם רלוונטי)
- [ ] בדקת שמשתמשים לא מחוברים לא רואים את הדאשבורד

## בדיקה סופית

- [ ] הדאשבורד עובד באתר
- [ ] נראה טוב במחשב
- [ ] נראה טוב במובייל
- [ ] אין שגיאות
- [ ] הכל מהיר וזורם

## 🎉 סיימת!

כל עדכון עתידי:
1. ערוך קבצים בקוד
2. `git add .`
3. `git commit -m "תיאור השינוי"`
4. `git push`
5. Vercel יעדכן אוטומטית תוך דקה

---

**זקוק לעזרה?** ראה `DEPLOYMENT_GUIDE.md`
