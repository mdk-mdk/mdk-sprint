# 📄 מידע על דפי הנחיתה

## ✅ המצב הנוכחי

הדף החדש **"ספרינט - פריצה בהכנסות"** הוא עכשיו הדף הראשי שמוצג ב-`/App.tsx`.

---

## 📂 הקבצים שיש לך:

### **1. `/App.tsx`** ← הדף הראשי (מה ש-Vercel מציג)

- **תוכן נוכחי**: הדף החדש "ספרינט - פריצה בהכנסות"
- זה הדף שהאנשים יראו כשיכנסו לאתר

### **2. `/NewLanding.tsx`** ← הדף החדש המלא

- כל התוכן של "ספרינט - פריצה בהכנסות"
- כולל:
  - Hero Section עם "חייב יותר הכנסות אבל נתקע?"
  - סקשן כאבים (4 כרטיסיים)
  - קהל יעד (4 קטגוריות)
  - המסע של 7 שלבים
  - חלק "מי אני" (מרדכי דניאל קליין)
  - טופס יצירת קשר + EmailJS
  - כפתור וואטסאפ צף (054-8456062)

---

## 🔄 איך לחזור לדף הקודם (Sprint MDK)?

הדף הקודם **"Sprint MDK"** (הכנסות זה לא מזל - זו שיטה) נשמר ב-**Git history** של GitHub/Vercel.

### אפשרות 1: שחזור מ-Git

```bash
git log --oneline  # מצא את הקומיט הרלוונטי
git checkout [COMMIT_HASH] App.tsx  # שחזר את הקובץ
```

### אפשרות 2: בקש ממני (AI) לשחזר

פשוט תגיד: "תשחזר לי את הדף Sprint MDK המקורי" ואני אשחזר אותו.

---

## 🎯 איך להחליף בין הדפים?

### להציג את הדף החדש (מצב נוכחי):

```tsx
// בקובץ App.tsx
import NewLanding from "./NewLanding";
export default function App() {
  return <NewLanding />;
}
```

### להציג את הדף הישן (Sprint MDK):

ראשית תצטרך לשחזר את SprintMDK.tsx, ואז:

```tsx
// בקובץ App.tsx
import SprintMDK from "./SprintMDK";
export default function App() {
  return <SprintMDK />;
}
```

### להציג תפריט בחירה (2 דפים):

```tsx
// בקובץ App.tsx - אפשר לבקש ממני ליצור את זה
import { useState } from "react";
import SprintMDK from "./SprintMDK";
import NewLanding from "./NewLanding";

export default function App() {
  const [page, setPage] = useState("new"); // או 'mdk'
  return page === "new" ? <NewLanding /> : <SprintMDK />;
}
```

---

## ✉️ EmailJS - מוגדר ועובד!

שני הדפים משתמשים באותם מפתחות EmailJS:

- **Service ID**: `service_qk163ek`
- **Template ID**: `template_hm8xf7m`
- **Public Key**: `wugMsIka4GQkEjZ6n`

כשמישהו ממלא טופס - המייל נשלח ישירות אליך! ✅

---

## 📱 וואטסאפ

כפתור וואטסאפ צף בשני הדפים מוביל למספר: **054-8456062**

---

## 🎨 עיצוב

שני הדפים משתמשים באותה שפה גרפית:

- צבעים: ירוק כהה (emerald-900) + זהב (#b89c57)
- אייקונים: lucide-react
- אנימציות: motion/react
- כפתורים: shadcn/ui

---

## 🚀 פריסה ל-Production

1. **commit** ו-**push** את השינויים ל-GitHub
2. **Vercel** יעדכן את הדף אוטומטית
3. הדף החדש יהיה זמין תוך כמה שניות

```bash
git add .
git commit -m "עדכון לדף נחיתה חדש - ספרינט פריצה בהכנסות"
git push origin main
```

---

## 💡 שאלות נפוצות

**ש: איפה הדף הישן (Sprint MDK)?**  
ת: נשמר ב-Git history. אפשר לשחזר אותו בכל רגע.

**ש: אפשר להציג שני דפים בו-זמנית?**  
ת: כן! אפשר ליצור תפריט בחירה או להוסיף ניתוב (routing).

**ש: איך משנים טקסטים בדף החדש?**  
ת: עורכים את הקובץ `/NewLanding.tsx`

**ש: EmailJS עובד בשני הדפים?**  
ת: כן! שניהם משתמשים באותם מפתחות שהגדרת.

---

**זקוק לעזרה?** פשוט שאל! 🙂