const sideMenu = document.querySelector("#sideMenu");

function openMenu() {
  sideMenu.style.transform = "translateX(-16rem)";
}
function closeMenu() {
  sideMenu.style.transform = "translateX(16rem)";
}

const themeToggle = document.getElementById("theme-toggle");
const logo = document.getElementById("logo");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    logo.src = "./assets/logowhite.png";
    themeIcon.src = "./assets/theme_light.png";
  } else {
    localStorage.setItem("theme", "light");
    logo.src = "./assets/logoblack.png";
    themeIcon.src = "./assets/theme_dark.png";
  }
});

// Apply the saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  logo.src = "./assets/logowhite.png";
  themeIcon.src = "./assets/theme_light.png";
}