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
const heroVideo = document.getElementById("hero-video");
const heroVideoSource = document.getElementById("hero-video-source");
const heroContent = document.getElementById("hero-content"); // Add this line

// Update the video source immediately on theme change
function updateHeroVideoSource(isDarkMode) {
  const newSrc = isDarkMode
    ? "./assets/video/blackk.mp4"
    : "./assets/video/videobackground.mp4";
  if (heroVideoSource.src !== newSrc) {
    // Update the <source> tag's src
    heroVideoSource.src = newSrc;
    heroVideo.load();
    heroVideo.play().catch((err) => {});
  }
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (isDarkMode) {
    localStorage.setItem("theme", "dark");
    if (logo) logo.src = "./assets/logowhite.png";
    themeIcon.src = "./assets/theme_light.png";
    heroContent.classList.add("text-white");
  } else {
    localStorage.setItem("theme", "light");
    if (logo) logo.src = "./assets/logoblack.png";
    themeIcon.src = "./assets/theme_dark.png";
    heroContent.classList.remove("text-white");
  }

  updateHeroVideoSource(isDarkMode);
});

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  if (logo) logo.src = "./assets/logowhite.png";
  themeIcon.src = "./assets/theme_light.png";
  heroContent.classList.add("text-white");
  updateHeroVideoSource(true);
} else {
  if (logo) logo.src = "./assets/logoblack.png";
  themeIcon.src = "./assets/theme_dark.png";
  heroContent.classList.remove("text-white");
  updateHeroVideoSource(false);
}
