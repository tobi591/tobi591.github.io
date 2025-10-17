// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // ⬅️ replace with your real key

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const params = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
    .then(function (response) {
      alert("✅ Danke! Deine Nachricht wurde erfolgreich gesendet.");
      console.log("SUCCESS!", response.status, response.text);
      e.target.reset();
    })
    .catch(function (error) {
      alert("❌ Fehler beim Senden der Nachricht. Bitte später erneut versuchen.");
      console.error("FAILED...", error);
    });
});

// ---------- Lightbox functionality ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Add click listener to all gallery images
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src; // show clicked image in large view
  });
});

// Close the lightbox when the X is clicked
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close the lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
