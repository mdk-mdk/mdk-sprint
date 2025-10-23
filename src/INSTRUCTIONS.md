# 📋 הוראות העלאה לוורסל - שלב אחר שלב

## 🎯 מה יש לך עכשיו?

הפרויקט מוכן להעלאה! כל הקבצים נמצאים כאן ב-Figma Make.

---

## 📥 שלב 1: הורדת הקבצים ל-VS Code

### אופציה א': העתקה ידנית (הכי פשוט)

1. **צור תיקיה חדשה במחשב** בשם `mdk-sprint`

2. **הורד את כל הקבצים מ-Figma Make:**
   - לחץ על כל קובץ ב-Figma Make
   - העתק את התוכן
   - צור קובץ חדש ב-VS Code באותו שם
   - הדבק את התוכן

3. **קבצים שצריכים להיות בשורש הפרויקט:**
   ```
   mdk-sprint/
   ├── index.html
   ├── package.json
   ├── vite.config.ts
   ├── tsconfig.json
   ├── tsconfig.node.json
   ├── postcss.config.js
   ├── .gitignore
   ├── README.md
   ├── INSTRUCTIONS.md (הקובץ הזה)
   ├── App.tsx
   ├── NewLanding.tsx
   ├── components/
   │   ├── ui/ (כל הקבצים)
   │   └── figma/ (ImageWithFallback.tsx)
   └── styles/
       └── globals.css
   ```

### אופציה ב': שימוש ב-CLI של Figma Make (אם יש)

1. לחץ על "Export" או "Download" ב-Figma Make
2. פתח את התיקיה ב-VS Code

---

## 🚀 שלב 2: התקנת החבילות

פתח את הטרמינל ב-VS Code ורץ:

```bash
npm install
```

זה יתקין את כל החבילות הדרושות (React, Tailwind, EmailJS, Motion וכו').

**⏱️ זה ייקח כמה דקות - תן לזה להסתיים!**

---

## ✅ שלב 3: בדיקה מקומית (אופציונלי אבל מומלץ)

לפני שמעלים לוורסל, כדאי לבדוק שהכל עובד:

```bash
npm run dev
```

פתח את הדפדפן ב-`http://localhost:5173`

**בדוק:**
- ✅ האתר נטען נכון
- ✅ האנימציות עובדות
- ✅ הטופס עובד
- ✅ כפתור הוואטסאפ עובד

כשהכל עובד, לחץ `Ctrl+C` בטרמינל לעצירה.

---

## 🌐 שלב 4: העלאה ל-Vercel

### דרך 1: דרך GitHub (מומלץ - קל לעדכן אחר כך)

#### א. יצירת Repository ב-GitHub

1. לך ל-**github.com**
2. לחץ על **"New repository"** (הכפתור הירוק)
3. תן שם: `mdk-sprint`
4. סמן **"Private"** (אם אתה רוצה שזה יהיה פרטי)
5. **אל** תסמן "Add README" (יש לנו כבר)
6. לחץ **"Create repository"**

#### ב. העלאת הקוד ל-GitHub

בטרמינל ב-VS Code, הרץ את הפקודות האלה **אחת אחת**:

```bash
# 1. התחל Git
git init

# 2. הוסף את כל הקבצים
git add .

# 3. צור commit ראשון
git commit -m "Initial commit - MDK Sprint"

# 4. שנה את השם של הענף ל-main
git branch -M main

# 5. חבר ל-GitHub (החלף YOUR_USERNAME ו-YOUR_REPO בשלך!)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 6. העלה את הקוד
git push -u origin main
```

**💡 טיפ:** GitHub יראה לך את הפקודה המדויקת אחרי שתיצור את ה-repository!

#### ג. העלאה ל-Vercel מ-GitHub

1. לך ל-**vercel.com**
2. **התחבר עם GitHub** (אם אין לך חשבון, צור אחד - זה חינם!)
3. לחץ על **"Add New..."** → **"Project"**
4. בחר את ה-repository **"mdk-sprint"**
5. Vercel **יזהה אוטומטית** שזה Vite + React
6. **אל תשנה שום הגדרה** - הכל כבר מוגדר נכון
7. לחץ על **"Deploy"**

**⏱️ תוך 2-3 דקות האתר יהיה LIVE!** 🎉

---

### דרך 2: העלאה ישירה מהמחשב (בלי GitHub)

#### א. התקן את Vercel CLI

```bash
npm install -g vercel
```

#### ב. התחבר ל-Vercel

```bash
vercel login
```

זה יפתח דפדפן - התחבר עם Google/GitHub/Email.

#### ג. העלה את הפרויקט

```bash
vercel
```

**עקוב אחרי השאלות:**
- "Set up and deploy...?" → **Y (כן)**
- "Which scope...?" → בחר את החשבון שלך
- "Link to existing project?" → **N (לא)**
- "What's your project's name?" → **mdk-sprint**
- "In which directory...?" → **./  (רק ENTER)**
- "Want to override settings?" → **N (לא)**

#### ד. העלה לפרודקשן

```bash
vercel --prod
```

**תוך דקות האתר יהיה LIVE!** 🎉

---

## 🎨 שלב 5: קבלת הקישור לאתר

אחרי ההעלאה, Vercel ייתן לך קישור כמו:
```
https://mdk-sprint.vercel.app
```

**זהו! האתר שלך באוויר!** 🚀

---

## 🔄 עדכונים עתידיים

### אם העלת דרך GitHub:

1. ערוך את הקבצים ב-VS Code
2. שמור את השינויים
3. בטרמינל:
   ```bash
   git add .
   git commit -m "עדכון: תיאור מה שינית"
   git push
   ```
4. **Vercel יעדכן אוטומטית!** (תוך 1-2 דקות)

### אם העלת ישירות:

```bash
vercel --prod
```

---

## ❓ פתרון בעיות נפוצות

### ❌ "command not found: npm"
**פתרון:** התקן Node.js מ-nodejs.org

### ❌ "Package not found" בזמן npm install
**פתרון:** מחק את התיקיה `node_modules` ו-`package-lock.json` והרץ שוב `npm install`

### ❌ האתר לא נטען ב-Vercel
**פתרון:** בדוק ב-Vercel Logs (Deployments → בחר את ה-deployment → View Function Logs)

### ❌ התמונות לא מופיעות
**פתרון:** וודא שכל התמונות נמצאות בתיקיית `public/` או מיובאות נכון עם `figma:asset`

---

## 📞 צריך עזרה?

אם משהו לא עובד:
1. בדוק את ה-**Console** בדפדפן (F12)
2. בדוק את **Vercel Logs**
3. וודא ש-**כל הקבצים** הועתקו נכון

---

**בהצלחה! 🎉**

מרדכי דניאל קליין | מומחה לאפקטיביות עסקית  
חבר בלשכת היועצים העסקיים בישראל
