# 📧 הגדרת EmailJS - מדריך מהיר

## 🚀 שלב 1: הרשמה ל-EmailJS

1. היכנס לאתר: https://www.emailjs.com/
2. לחץ על **Sign Up** והירשם (חינם!)
3. אמת את האימייל שלך

---

## ⚙️ שלב 2: יצירת Email Service

1. בדשבורד, לחץ על **Email Services**
2. לחץ על **Add New Service**
3. בחר את ספק המייל שלך (Gmail מומלץ)
4. עקוב אחרי ההוראות להתחברות
5. **העתק את ה-Service ID** (לדוגמה: `service_abc123`)

---

## 📝 שלב 3: יצירת Email Template

1. לחץ על **Email Templates**
2. לחץ על **Create New Template**
3. שם את התבנית: **Sprint MDK Contact Form**
4. ערוך את תוכן המייל:

```
שם: {{from_name}}
טלפון: {{from_phone}}
אימייל: {{from_email}}
הודעה: {{message}}
```

5. שמור את התבנית
6. **העתק את ה-Template ID** (לדוגמה: `template_xyz789`)

---

## 🔑 שלב 4: קבלת Public Key (User ID)

1. לחץ על **Account** בתפריט העליון
2. בקטע **General** תמצא **Public Key** (נקרא גם **User ID**)
3. **העתק אותו במדויק** (לדוגמה: `abc123XYZ456` או `user_XYZ123`)
4. ⚠️ **זה לא ה-Service ID ולא ה-Template ID** - זה מפתח נפרד!

---

## 💻 שלב 5: עדכון הקוד

פתח את הקובץ `/App.tsx` ועדכן את השורות הבאות (סביב שורה 128-130):

```typescript
const EMAILJS_SERVICE_ID = 'service_abc123';  // 👈 Service ID שלך
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // 👈 Template ID שלך
const EMAILJS_PUBLIC_KEY = 'abc123XYZ456';     // 👈 Public Key שלך (User ID)
```

⚠️ **חשוב**: 
- ה-Public Key נקרא גם **User ID** ב-EmailJS
- הוא לא ה-Service ID ולא ה-Template ID
- אפשר למצוא אותו ב: **Account → API Keys → Public Key**

---

## ✅ זהו! הטופס מוכן לשימוש

### 🧪 בדיקה:
1. הרץ את הפרויקט: `npm run dev`
2. מלא את הטופס ושלח
3. בדוק את המייל שלך - אמור להגיע בתוך דקה!

---

## 📊 מגבלות חינמיות של EmailJS:

- **200 מיילים/חודש** (מספיק לדף נחיתה)
- ללא הגבלת זמן
- אם צריך יותר - ניתן לשדרג בתשלום מינימלי

---

## 🆘 בעיות נפוצות:

### ❌ שגיאה: "The Public Key is invalid"
**פתרון:**
1. ודא שהעתקת את ה-**Public Key** ולא את ה-Service ID
2. ה-Public Key נמצא ב: **Account → General → Public Key**
3. הוא בדרך כלל מתחיל ב-`user_` או סדרת אותיות/מספרים אקראיים
4. **העתק את הקוד במדויק** - ללא רווחים או תווים נוספים

### המייל לא מגיע?
1. בדוק שה-Service מחובר נכון (ב-Dashboard)
2. בדוק את תיבת ה-Spam
3. ודא שכל ה-3 IDs נכונים בקוד (Service, Template, Public Key)
4. נסה לשלוח מייל מה-Dashboard של EmailJS (Test)

### אין הודעת שגיאה אבל המייל לא מגיע?
- בדוק את **Email Templates** שהשדות תואמים: `{{from_name}}`, `{{from_phone}}`, `{{from_email}}`, `{{message}}`
- ודא ש-Template Status הוא **Active**

---

## 🎉 מוכן!

עכשיו כשמישהו ממלא טופס, אתה מקבל מייל אוטומטי עם כל הפרטים! 🚀
