# 🚀 התחלה מהירה - 5 דקות בלבד!

## השלבים הכי פשוטים להעלאת האתר לוורסל

---

### 📥 שלב 1: הורד את הקוד (2 דקות)

אם Figma Make מאפשר להוריד ZIP:
1. לחץ על **"Download"** או **"Export"**
2. חלץ את הקובץ
3. פתח את התיקיה ב-VS Code

**או** העתק ידנית:
1. צור תיקיה `mdk-sprint` במחשב
2. פתח אותה ב-VS Code
3. צור את המבנה:
   ```
   mdk-sprint/
   ├── components/
   │   ├── ui/
   │   └── figma/
   └── styles/
   ```
4. העתק את כל 55 הקבצים (ראה `FILES_CHECKLIST.md`)

---

### 🔧 שלב 2: התקן חבילות (1 דקה)

פתח טרמינל ב-VS Code:

```bash
npm install
```

**⏱️ המתן עד שזה מסתיים!**

---

### ✅ שלב 3: בדיקה (1 דקה - אופציונלי)

```bash
npm run dev
```

פתח `http://localhost:5173` - אמור לעבוד מושלם! ✨

---

### 🌐 שלב 4: העלה לוורסל (1 דקה)

#### הדרך הכי מהירה:

```bash
# התקן את Vercel CLI
npm install -g vercel

# התחבר
vercel login

# העלה!
vercel --prod
```

**עקוב אחרי ההוראות על המסך ותוך דקה יש לך אתר LIVE!** 🎉

---

### 🎯 או דרך GitHub (טוב יותר לטווח ארוך):

```bash
# התחל Git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# העלה ל-GitHub (צור repository קודם ב-github.com)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# אחר כך ב-vercel.com:
# Add New → Project → בחר את ה-repo → Deploy
```

---

## 🎊 זהו! האתר שלך באוויר!

הקישור שלך יראה כך:
```
https://mdk-sprint.vercel.app
```

או

```
https://YOUR-CUSTOM-DOMAIN.com
```

---

## 📝 רוצה לערוך משהו?

1. ערוך את הקבצים ב-VS Code
2. אם דרך GitHub:
   ```bash
   git add .
   git commit -m "עדכון"
   git push
   ```
3. אם ישירות:
   ```bash
   vercel --prod
   ```

**Vercel יעדכן אוטומטית!** 🔄

---

## 🆘 יש בעיה?

ראה את `INSTRUCTIONS.md` להוראות מפורטות או `README.md` למידע טכני.

---

**בהצלחה! מרדכי דניאל קליין 🚀**
