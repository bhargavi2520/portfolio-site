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
    ? "./assets/video/blackBackGroundb.mp4"
    : "./assets/video/videobackgroundw.mp4";
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
    themeIcon.className = "ri-sun-line text-white";
    heroContent.classList.add("text-white");
  } else {
    localStorage.setItem("theme", "light");
    if (logo) logo.src = "./assets/logoblack.png";
    themeIcon.className = "ri-moon-line text-black";
    heroContent.classList.remove("text-white");
  }

  updateHeroVideoSource(isDarkMode);
});

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  if (logo) logo.src = "./assets/logowhite.png";
  themeIcon.className = "ri-sun-line text-white";
  heroContent.classList.add("text-white");
  updateHeroVideoSource(true);
} else {
  if (logo) logo.src = "./assets/logoblack.png";
  themeIcon.className = "ri-moon-line text-black";
  heroContent.classList.remove("text-white");
  updateHeroVideoSource(false);
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wlhpkv9",
        "template_hjj0sif",
        contactForm,
        "FbyQzk1g_nN2pwbIB"
      )
      .then(() => {
        contactMessage.textContent = "Message sent successfully!";
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        contactMessage.textContent = `Message not sent (Error: ${error.text})`;
      });
  };

  contactForm.addEventListener("submit", sendEmail);
});

//hero section animation
document.addEventListener("DOMContentLoaded", () => {
  // --- Anime.js Animations for Hero Section ---
  if (typeof anime !== "undefined") {
    // Hero Headline Animation
    const heroHeadline = document.querySelector(".anim-hero-headline");
    if (heroHeadline) {
      heroHeadline.innerHTML = heroHeadline.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
      anime.timeline({ loop: false }).add({
        targets: ".anim-hero-headline .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i,
      });
    }

    // General Fade-in Animation for on-load elements (Hero section)
    anime({
      targets: ".anim-fade-in",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: "easeInOutQuad",
      delay: anime.stagger(200, { start: 800 }),
    });

    // Profile Image Background "Aura" Animation
    const animationContainer = document.getElementById(
      "profile-animation-container"
    );
    if (animationContainer) {
      const blobCount = 3;
      for (let i = 0; i < blobCount; i++) {
        const blob = document.createElement("div");
        blob.classList.add("blob");
        blob.style.width = anime.random(50, 120) + "px";
        blob.style.height = blob.style.width;
        blob.style.left = anime.random(0, 100) + "%";
        blob.style.top = anime.random(0, 100) + "%";
        animationContainer.appendChild(blob);
      }

      function animateBlobs() {
        anime({
          targets: ".blob",
          translateX: () => anime.random(-25, 25) + "%",
          translateY: () => anime.random(-25, 25) + "%",
          scale: () => anime.random(0.8, 1.8),
          rotate: () => anime.random(-180, 180),
          duration: 8000,
          easing: "easeInOutQuad",
          complete: animateBlobs, // Loop the animation
        });
      }
      animateBlobs();
    }

    //about section animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("anim-container-left")) {
              anime({
                targets: entry.target.querySelectorAll(".anim-item"),
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(150),
                easing: "easeOutCubic",
              });
            }

            if (entry.target.classList.contains("anim-container-right")) {
              anime({
                targets: entry.target.querySelectorAll(".anim-item"),
                translateX: [-40, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(150),
                easing: "easeOutCubic",
              });
            }

            if (entry.target.classList.contains("anim-section-header")) {
              anime({
                targets: entry.target,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: "easeOutCubic",
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".anim-item, .anim-section-header")
      .forEach((el) => {
        el.style.opacity = "0";
      });

    document
      .querySelectorAll(
        ".anim-container-left, .anim-container-right, .anim-section-header"
      )
      .forEach((el) => {
        observer.observe(el);
      });

    //project section animation
    if (typeof anime !== "undefined") {
      const observerOptions = { threshold: 0.1 };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation for main title
            if (entry.target.classList.contains("anim-fade-in")) {
              anime({
                targets: entry.target,
                translateY: [-30, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: "easeOutExpo",
              });
            }

            // Animation for Project Cards
            if (entry.target.classList.contains("anim-project-card")) {
              anime({
                targets: entry.target,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 1200,
                easing: "easeOutElastic(1, .8)",
                delay: 100,
              });
            }

            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Set initial opacity to 0 and observe elements for animation
      document
        .querySelectorAll(".anim-fade-in, .anim-project-card")
        .forEach((el) => {
          el.style.opacity = "0";
          observer.observe(el);
        });
    }
  }

  // Initialize Swiper for Certifications Carousel
  if (typeof Swiper !== "undefined") {
    new Swiper(".certification-swiper", {
      loop: true,
      autoplay: {
        delay: 2500, // Auto-slide every 1.5 seconds
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // Anime.js Animation Logic
  if (typeof anime !== "undefined") {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("anim-fade-in")) {
            anime({
              targets: entry.target,
              translateY: [-30, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: "easeOutExpo",
            });
          }
          if (entry.target.classList.contains("anim-skills-list")) {
            const timeline = anime.timeline({
              easing: "easeOutExpo",
              duration: 800,
            });
            timeline
              .add({
                targets: ".skill-category",
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(200),
              })
              .add(
                {
                  targets: ".skill-link",
                  scale: [0.8, 1],
                  opacity: [0, 1],
                  delay: anime.stagger(70, { from: "first" }),
                },
                "-=800"
              );
          }
          if (entry.target.classList.contains("anim-journey-card")) {
            anime({
              targets: entry.target,
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: "easeOutExpo",
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".anim-fade-in, .skill-category, .anim-journey-card")
      .forEach((el) => {
        el.style.opacity = "0";
      });

    document
      .querySelectorAll(".anim-fade-in, .anim-skills-list, .anim-journey-card")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  // Get a reference to the button
  const backToTopButton = document.getElementById("back-to-top");

  // Check if the button exists on the page
  if (backToTopButton) {
    // Add a scroll event listener to the window
    window.addEventListener("scroll", () => {
      // If the user has scrolled down more than 300 pixels...
      if (window.scrollY > 300) {
        // ...make the button visible by removing the transition classes.
        backToTopButton.classList.remove("opacity-0", "translate-y-16");
      } else {
        // ...otherwise, hide the button by adding the classes back.
        backToTopButton.classList.add("opacity-0", "translate-y-16");
      }
    });

    // Add a click event listener to the button
    backToTopButton.addEventListener("click", () => {
      // When clicked, smoothly scroll the window to the very top.
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
