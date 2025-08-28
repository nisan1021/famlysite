// פונקציה להוספת כתבה חדשה
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

// פונקציה לבדוק סיסמה מול Flask ב-Render
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
    console.log("Server response:", result); // מציג את התשובה מהשרת ב-Console

    if (result.message && result.message.toLowerCase().includes("ok you in")) {
      // אם הסיסמה נכונה -> מעבר לדף הנחיתה
      window.location.href = "index.html";
    } else {
      // אם הסיסמה שגויה -> מציג הודעה למשתמש
      document.getElementById("result").innerText = result.message;
    }

  } catch (error) {
    document.getElementById("result").innerText = "שגיאה בחיבור לשרת";
    console.error(error);
  }
}



