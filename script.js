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
async function checkPassword() {
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://famlysite-2.onrender.com/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: password })
    });

    const result = await response.json();
    document.getElementById("result").innerText = result.message;
  } catch (error) {
    document.getElementById("result").innerText = "שגיאה בחיבור לשרת";
  }
}

