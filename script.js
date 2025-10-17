document.addEventListener("DOMContentLoaded", function() {

  // ---------- EmailJS ----------
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const SERVICE_ID = "YOUR_SERVICE_ID";
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  if (window.emailjs) emailjs.init(PUBLIC_KEY);

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };
      emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then(() => { alert("✅ Nachricht gesendet!"); form.reset(); })
        .catch(() => { alert("❌ Fehler beim Senden."); });
    });
  }

  // ---------- Lightbox ----------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");
  const images = Array.from(document.querySelectorAll(".gallery img"));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() { lightbox.setAttribute("aria-hidden","true"); }

  function showNext() { currentIndex = (currentIndex+1)%images.length; lightboxImg.src = images[currentIndex].src; }
  function showPrev() { currentIndex = (currentIndex-1+images.length)%images.length; lightboxImg.src = images[currentIndex].src; }

  images.forEach((img, i)=> img.addEventListener("click", ()=> openLightbox(i)));
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  lightbox.addEventListener("click", (e)=> { if(e.target===lightbox) closeLightbox(); });

  document.addEventListener("keydown",(e)=>{
    if(lightbox.getAttribute("aria-hidden")==="false"){
      if(e.key==="Escape") closeLightbox();
      if(e.key==="ArrowRight") showNext();
      if(e.key==="ArrowLeft") showPrev();
    }
  });

});
