const tips = [
  "צאו להליכה קצרה יחד בסוף היום.",
  "בחרו סרט משפחתי וערב פופקורן.",
  "נסו ללמוד משהו חדש ב-15 דקות.",
  "הקדישו זמן לשיחת תודה יומית."
];

const challenges = [
  "משימת צילום שקיעה משפחתית",
  "לבשל יחד מתכון חדש",
  "שעה ללא טלפונים - רק משחקי קופסה",
  "לכתוב 3 מטרות לשבוע הקרוב"
];

function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

function showRandomTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  const box = document.getElementById("tipBox");
  if (box) box.textContent = `💬 ${tip}`;
}

function updateClock() {
  const el = document.getElementById("liveClock");
  if (!el) return;
  const now = new Date();
  el.textContent = `השעה עכשיו: ${now.toLocaleTimeString("he-IL")}`;
}

function initNews() {
  const form = document.getElementById("newsForm");
  const container = document.getElementById("newsContainer");
  if (!form || !container) return;

  const saved = JSON.parse(localStorage.getItem("familyNews") || "[]");
  const render = () => {
    container.innerHTML = "";
    saved.forEach((item) => {
      const div = document.createElement("article");
      div.className = "news-item";
      div.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
      container.appendChild(div);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("newsTitle").value.trim();
    const text = document.getElementById("newsText").value.trim();
    if (!title || !text) return;
    saved.unshift({ title, text });
    localStorage.setItem("familyNews", JSON.stringify(saved));
    form.reset();
    render();
  });

  render();
}

function initForum() {
  const form = document.getElementById("forumForm");
  const postsEl = document.getElementById("forumPosts");
  if (!form || !postsEl) return;

  const posts = JSON.parse(localStorage.getItem("familyForum") || "[]");
  const render = () => {
    postsEl.innerHTML = "";
    posts.forEach((post) => {
      const el = document.createElement("div");
      el.className = "post";
      el.innerHTML = `<strong>${post.name}</strong><p>${post.message}</p>`;
      postsEl.appendChild(el);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("forumName").value.trim();
    const message = document.getElementById("forumMessage").value.trim();
    if (!name || !message) return;
    posts.unshift({ name, message });
    localStorage.setItem("familyForum", JSON.stringify(posts));
    form.reset();
    render();
  });

  render();
}

function initGrades() {
  const form = document.getElementById("gradeForm");
  const list = document.getElementById("gradeList");
  const stats = document.getElementById("gradeStats");
  if (!form || !list || !stats) return;

  const grades = [];
  const render = () => {
    list.innerHTML = grades.map((g) => `<li>${g}</li>`).join("");
    if (!grades.length) {
      stats.textContent = "עדיין לא הוזנו ציונים.";
      return;
    }
    const avg = (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
    stats.textContent = `מספר ציונים: ${grades.length} | ממוצע: ${avg}`;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = Number(document.getElementById("gradeInput").value);
    if (Number.isNaN(value) || value < 0 || value > 100) return;
    grades.push(value);
    form.reset();
    render();
  });

  render();
}

let studySeconds = 600;
let timerInterval = null;

function renderStudyTimer() {
  const timerEl = document.getElementById("studyTimer");
  if (!timerEl) return;
  const min = String(Math.floor(studySeconds / 60)).padStart(2, "0");
  const sec = String(studySeconds % 60).padStart(2, "0");
  timerEl.textContent = `${min}:${sec}`;
}

function startStudyTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (studySeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("כל הכבוד! סשן הלמידה הסתיים 🎉");
      return;
    }
    studySeconds -= 1;
    renderStudyTimer();
  }, 1000);
}

function resetStudyTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  studySeconds = 600;
  renderStudyTimer();
}

function generateChallenge() {
  const box = document.getElementById("challengeBox");
  if (!box) return;
  box.textContent = challenges[Math.floor(Math.random() * challenges.length)];
}

function initAgeCalculator() {
  const form = document.getElementById("ageForm");
  const result = document.getElementById("ageResult");
  if (!form || !result) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const year = Number(document.getElementById("birthYear").value);
    const age = new Date().getFullYear() - year;
    result.textContent = age > 0 ? `הגיל המשוער שלך הוא ${age}` : "שנת לידה לא תקינה";
  });
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

    if (result.message && result.message.toLowerCase().includes("ok you in")) {
      window.location.href = "index.html";
    } else {
      document.getElementById("result").innerText = result.message;
    }

  } catch (error) {
    document.getElementById("result").innerText = "שגיאה בחיבור לשרת";
    console.error(error);
  }
}

function initThemeFromStorage() {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeFromStorage();
  updateClock();
  setInterval(updateClock, 1000);
  initNews();
  initForum();
  initGrades();
  initAgeCalculator();
  renderStudyTimer();
});
