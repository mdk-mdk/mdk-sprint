#!/bin/bash

# 🚀 סקריפט מהיר להעלאת הפרויקט לגיטהאב

echo "🎯 מכין את הפרויקט לגיטהאב..."

# צבעים לפלט יפה
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# בדיקה אם git מותקן
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git לא מותקן במערכת${NC}"
    exit 1
fi

# אתחול git אם צריך
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📦 מאתחל git repository...${NC}"
    git init
    git branch -M main
else
    echo -e "${GREEN}✓ Git repository כבר קיים${NC}"
fi

# בדיקה אם יש remote
if ! git remote get-url origin &> /dev/null; then
    echo -e "${BLUE}🔗 הוסף את ה-remote URL של GitHub:${NC}"
    echo "לדוגמה: https://github.com/username/user-dashboard.git"
    read -p "GitHub Repository URL: " repo_url
    git remote add origin "$repo_url"
    echo -e "${GREEN}✓ Remote נוסף בהצלחה${NC}"
fi

# הוסף את כל הקבצים
echo -e "${BLUE}📝 מוסיף קבצים ל-staging...${NC}"
git add .

# בקש הודעת commit
read -p "💬 הודעת commit (לחץ Enter לברירת מחדל): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Initial commit from Figma - User Dashboard"
fi

# Commit
echo -e "${BLUE}💾 יוצר commit...${NC}"
git commit -m "$commit_msg"

# Push
echo -e "${BLUE}🚀 מעלה לגיטהאב...${NC}"
git push -u origin main

echo ""
echo -e "${GREEN}✅ הצלחה! הפרויקט הועלה לגיטהאב${NC}"
echo -e "${BLUE}📋 השלבים הבאים:${NC}"
echo "1. גש ל-https://vercel.com"
echo "2. התחבר עם GitHub"
echo "3. לחץ 'Add New Project'"
echo "4. בחר את ה-repository"
echo "5. לחץ 'Deploy'"
echo ""
echo -e "${GREEN}🎉 בעוד דקה-שתיים תקבל URL לדאשבורד!${NC}"
