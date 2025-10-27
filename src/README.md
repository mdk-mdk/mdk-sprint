# ספרינט - פריצה בהכנסות 🚀

אתר מקצועי Multi-Page לתהליך ליווי של 12 שבועות להגדלת הכנסות.

## תכונות עיקריות

✅ **Multi-Page App** - 3 דפים עם React Router (ספרינט, אודות, צור קשר)  
✅ עיצוב RTL מלא בעברית  
✅ אנימציות מתקדמות עם Motion (Framer Motion)  
✅ שליחת טפסים עם EmailJS  
✅ כפתור וואטסאפ צף  
✅ תפריט ניווט קבוע (Header) בכל הדפים  
✅ רספונסיבי מלא (מובייל + דסקטופ)  
✅ ירוק כהה וזהב (#b89c57) - פלטת צבעים מותאמת אישית  
✅ אפקט Typewriter על הכותרת הראשית  
✅ תעודת חברות בלשכת היועצים העסקיים

## התקנה מקומית

### דרישות מוקדמות
- Node.js גרסה 18 ומעלה
- npm או yarn

### צעדים להתקנה

```bash
# 1. התקן את החבילות
npm install

# 2. הרץ את השרת המקומי
npm run dev

# 3. פתח בדפדפן
http://localhost:5173
```

## העלאה ל-Vercel

### אופציה 1: דרך GitHub

1. **צור repository חדש ב-GitHub**
   - לך ל-github.com
   - לחץ על "New repository"
   - תן שם לפרויקט (למשל: `mdk-sprint`)
   - אל תוסיף README, .gitignore או רישיון (יש לנו כבר)

2. **העלה את הקוד ל-GitHub**
   ```bash
   # התחל git בתיקיית הפרויקט
   git init
   
   # הוסף את כל הקבצים
   git add .
   
   # צור commit ראשון
   git commit -m "Initial commit - Sprint Revenue Breakthrough"
   
   # חבר ל-repository שיצרת (החלף YOUR_USERNAME ו-YOUR_REPO)
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   
   # העלה את הקוד
   git branch -M main
   git push -u origin main
   ```

3. **העלה ל-Vercel**
   - לך ל-vercel.com והתחבר עם GitHub
   - לחץ על "Add New" → "Project"
   - בחר את ה-repository שיצרת
   - Vercel יזהה אוטומטית שזה Vite
   - לחץ על "Deploy"
   - תוך דקות האתר יהיה live! 🎉

### אופציה 2: העלאה ישירה מהמחשב

1. **התקן את Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **התחבר ל-Vercel**
   ```bash
   vercel login
   ```

3. **העלה את הפרויקט**
   ```bash
   # מתיקיית הפרויקט
   vercel
   
   # עקוב אחרי ההוראות במסך
   # בחר "Yes" כשנשאל אם להתקין
   # אשר את ה-Settings
   ```

4. **העלה לפרודקשן**
   ```bash
   vercel --prod
   ```

## קבצים חשובים

### קבצי קונפיגורציה שחייבים להיות בפרויקט:

1. **index.html** (בשורש הפרויקט)
2. **vite.config.ts** (קונפיגורציה של Vite)
3. **tsconfig.json** (קונפיגורציה של TypeScript)
4. **postcss.config.js** (לTailwind)

אם הקבצים האלה חסרים, הנה התוכן שלהם:

### index.html
```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ספרינט - פריצה בהכנסות. תהליך ליווי של 12 שבועות להגדלת הכנסות עסקיות." />
    <title>ספרינט - פריצה בהכנסות | מרדכי דניאל קליין</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## מבנה התיקיות (Multi-Page)

```
mdk-sprint/
├── main.tsx                  # ⭐ נקודת כניסה (REQUIRED!)
├── App.tsx                   # ראוטר ראשי (React Router)
├── NewLanding.tsx            # קומפוננט דף הבית המקורי
├── components/
│   ├── Header.tsx            # תפריט ניווט משותף
│   ├── Footer.tsx            # פוטר + כפתור וואטסאפ צף
│   ├── ui/                   # קומפוננטים של shadcn/ui
│   └── figma/                # קומפוננטים מ-Figma
├── pages/
│   ├── HomePage.tsx          # דף הבית - ספרינט פריצה בהכנסות
│   ├── AboutPage.tsx         # דף אודות - על מרדכי דניאל קליין
│   └── ContactPage.tsx       # דף צור קשר - טופס ופרטים
├── styles/
│   └── globals.css           # Tailwind + סגנונות גלובליים
├── index.html                # HTML ראשי
├── package.json              # כולל react-router-dom
├── vite.config.ts            # קונפיגורציה של Vite
├── vercel.json               # ⭐ קונפיגורציה ל-Vercel (חדש!)
├── .gitignore                # Git ignore
└── tsconfig.json
```

**📖 למידע מפורט על המבנה Multi-Page, קרא את `MULTI_PAGE_STRUCTURE.md`**

## הגדרות EmailJS

המפתחות כבר מוגדרים בקוד:
- Service ID: `service_qk163ek`
- Template ID: `template_hm8xf7m`
- Public Key: `wugMsIka4GQkEjZ6n`

וואטסאפ: 054-8456062

## טיפים לפיתוח

- השתמש ב-`npm run dev` לפיתוח מקומי
- הקוד כבר מותאם ל-RTL ועברית
- האנימציות עובדות עם Motion (Framer Motion)
- הדף מותאם לנייד ודסקטופ

## תמיכה

יצר: מרדכי דניאל קליין | מומחה לאפקטיביות עסקית  
חבר בלשכת היועצים העסקיים בישראל

---

**בהצלחה! 🚀**
