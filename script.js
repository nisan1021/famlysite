function addNews() {
    const newsContainer = document.getElementById("newsContainer");

    // יצירת כתבה חדשה
    const article = document.createElement("article");
    const title = document.createElement("h2");
    const text = document.createElement("p");

    title.innerText = "כותרת חדשה " + (newsContainer.children.length + 1);
    text.innerText = "תוכן הכתבה החדשה שהוספה בלחיצה על הכפתור.";

    article.appendChild(title);
    article.appendChild(text);
    newsContainer.appendChild(article);
}
