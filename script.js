// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your real key

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const params = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
    .then(() => {
      alert("✅ Danke! Deine Nachricht wurde erfolgreich gesendet.");
      e.target.reset();
    })
    .catch((error) => {
      alert("❌ Fehler beim Senden der Nachricht. Bitte später erneut versuchen.");
      console.error("FAILED...", error);
    });
});

// ---------- Lightbox functionality ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const images = document.querySelectorAll(".gallery img");

let currentIndex = 0;

// Open lightbox
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Navigate next
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Navigate previous
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
