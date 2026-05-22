document.addEventListener('DOMContentLoaded', function () {
  // =========================
  // Footer Year
  // =========================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================
  // Navbar Scroll & Mobile Toggle
  // =========================
  const nav = document.querySelector('.navbar');
  const navToggle = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('.navbar-collapse');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) navMenu.classList.remove('show');
      });
    });
  }

  // =========================
  // Smooth Scroll
  // =========================
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // =========================
  // Contact Form Validation + Alert
  // =========================
 // Contact Form Validation + Alert
// =========================
const form = document.getElementById('contactForm');
const alertEl = document.getElementById('formAlert');

function showAlert(msg, type) {
  if (!alertEl) return;
  alertEl.style.display = 'block';
  alertEl.className = `alert alert-${type}`;
  alertEl.textContent = msg;
  setTimeout(() => alertEl.style.display = 'none', 4000);
}

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name || !email || !msg) {
      showAlert('Please fill all fields.', 'danger');
      return;
    }

    // ✅ Send to Formspree
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showAlert('✅ Thank you — we received your message!', 'success');
      form.reset();
    } else {
      showAlert('❌ Error sending message. Please try again later.', 'danger');
    }
  });
}

  // navbar active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;
      const sectionId = section.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('.navbar-nav a[href*=' + sectionId + ']').classList.add('active');
      } else {
        document.querySelector('.navbar-nav a[href*=' + sectionId + ']').classList.remove('active');
      }
    });
  });

  // =========================
  // Hero Typing Effect
  // =========================
  const hero = document.getElementById("hero-text");
  const heroTexts = [
    "Building Smarter Software Solutions",
    "Web, Mobile & AI Development",
    "Turning Ideas into Digital Reality",
    "Your Growth, Powered by Technology"
  ];
  let i = 0, j = 0;
  const typingSpeed = 100, pause = 1500, fadeOutDelay = 500;

  function typeEffect() {
    if (!hero) return;
    if (j < heroTexts[i].length) {
      hero.textContent = heroTexts[i].substring(0, j + 1);
      j++;
      setTimeout(typeEffect, typingSpeed);
    } else {
      setTimeout(() => {
        hero.classList.add("fade-out");
        setTimeout(() => {
          hero.textContent = "";
          hero.classList.remove("fade-out");
          j = 0;
          i = (i + 1) % heroTexts.length;
          setTimeout(typeEffect, typingSpeed);
        }, fadeOutDelay);
      }, pause);
    }
  }
  typeEffect();

  // =========================
  // Scroll Reveal
  // =========================
  function revealSections(selector, threshold = 0.3) {
    const sections = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold });
    sections.forEach(sec => observer.observe(sec));
  }
  revealSections('.section-fade', 0.1);
  revealSections('.why-us-cards .card', 0.3);
  revealSections('.cta-contact-section', 0.3);
  revealSections('.leadership-container', 0.2);

  // =========================
  // Particles
  // =========================
  function initParticles(canvasId, sectionSelector, count = 60) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = document.querySelector(sectionSelector).offsetHeight;
    const particles = [];
    const mouse = { x: null, y: null };

    function Particle() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.color = ['#0097b2','#00fefb','#5de0e6','#004aad'][Math.floor(Math.random()*4)];
    }
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        if(mouse.x && mouse.y){
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 50){
            p.x += dx/dist*1.5;
            p.y += dy/dist*1.5;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if(p.x<0||p.x>width) p.vx*=-1;
        if(p.y<0||p.y>height) p.vy*=-1;
      }

      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const dx = particles[i].x-particles[j].x;
          const dy = particles[i].y-particles[j].y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if(dist<100){
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,251,${1-dist/100})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY - canvas.getBoundingClientRect().top;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.querySelector(sectionSelector).offsetHeight;
    });
  }

  initParticles('whyUsCanvas', '.why-us-section', 80);
  initParticles('contactCanvas', '.contact-section', 60);

  // =========================
  // Leadership Slider
  // =========================
  const cards = document.querySelectorAll('.message-card');
  const leadershipDots = document.querySelectorAll('.dot');
  const readMoreBtns = document.querySelectorAll('.read-more');
  let currentCard = 0;

  function showMessage(index) {
    if(index === currentCard) return;
    cards[currentCard].classList.remove('active','fade-in');
    leadershipDots[currentCard].classList.remove('active');
    setTimeout(() => {
      cards[currentCard].style.display='none';
      cards[index].style.display='block';
      setTimeout(()=>cards[index].classList.add('active','fade-in'),100);
      currentCard = index;
      leadershipDots[currentCard].classList.add('active');
    },400);
  }

  leadershipDots.forEach((dot,index)=>dot.addEventListener('click',()=>showMessage(index)));

  readMoreBtns.forEach(btn=>{
    btn.addEventListener('click', function(){
      const card = this.closest('.message-card');
      const shortText = card.querySelector('.short-text');
      const fullText = card.querySelector('.full-text');
      const fadeOverlay = card.querySelector('.fade-overlay');

      if(this.textContent==='Read More'){
        fullText.innerHTML = shortText.innerHTML + "<br><br>" + fullText.innerHTML;
        shortText.classList.add('d-none');
        fullText.classList.remove('d-none');
        fadeOverlay.style.opacity=0;
        fullText.style.maxHeight = fullText.scrollHeight + 'px';
        this.textContent='Read Less';
      } else {
        fullText.style.maxHeight = fullText.scrollHeight + 'px';
        requestAnimationFrame(()=> fullText.style.maxHeight='0');
        setTimeout(()=>{
          fadeOverlay.style.opacity=1;
          fullText.classList.add('d-none');
          shortText.classList.remove('d-none');
          this.textContent='Read More';
        },600);
      }
    });
  });

  // =========================
  // Testimonials Carousel
  // =========================
  const testimonials = [
    {name: "Sarah Johnson", role: "CEO, Tech Solutions", image: "Assets/pic/client1.jpg", rating: 5, review: "AllianceSoft transformed our business with a seamless mobile app. Highly professional!"},
    {name: "Mark Stevens", role: "Product Manager, InnovateX", image: "Assets/pic/client2.jpeg", rating: 4, review: "AI development services improved our efficiency quickly."},
    {name: "Linda Martinez", role: "Marketing Head, Creative Minds", image: "Assets/pic/client3.jpeg", rating: 5, review: "Excellent web development team! Engagement increased."},
    {name: "John Doe", role: "Founder, StartupX", image: "Assets/pic/client4.jpeg", rating: 4, review: "Highly skilled team. Project exceeded expectations."},
    {name: "Emma Wilson", role: "CTO, InnovateTech", image: "Assets/pic/client5.jpeg", rating: 5, review: "Amazing web and software services. Very satisfied."},
    {name: "David Brown", role: "Lead Designer, Creative Co.", image: "Assets/pic/client6.jpeg", rating: 4, review: "Website redesign was flawless. Great attention to detail!"}
  ];

  function getStars(rating){
    return Array.from({length:5},(_,i)=>i<rating?"&#9733;":"&#9734;").join('');
  }

  function generateTestimonials(){
    const container = document.getElementById("testimonialCarouselInner");
    const indicators = document.getElementById("carouselIndicators");
    if(!container||!indicators) return;
    const itemsPerSlide=3;

    for(let i=0;i<testimonials.length;i+=itemsPerSlide){
      const slideTestimonials=testimonials.slice(i,i+itemsPerSlide);
      const slide=document.createElement("div");
      slide.className = `carousel-item ${i===0?'active':''}`;

      const row = document.createElement("div");
      row.className = "row justify-content-center";

      slideTestimonials.forEach(t=>{
        const col=document.createElement("div");
        col.className="col-lg-4 col-md-6 col-12 mb-4";
        col.innerHTML=`
          <div class="card testimonial-card shadow-sm">
            <img src="${t.image}" alt="${t.name}">
            <h5 class="fw-bold mt-3">${t.name}</h5>
            <small class="text-muted">${t.role}</small>
            <div class="star-rating">${getStars(t.rating)}</div>
            <p class="testimonial-text">${t.review}</p>
          </div>`;
        row.appendChild(col);
      });

      slide.appendChild(row);
      container.appendChild(slide);

      const indicator = document.createElement("button");
      indicator.type="button";
      indicator.setAttribute("data-bs-target","#testimonialCarousel");
      indicator.setAttribute("data-bs-slide-to", i/itemsPerSlide);
      if(i===0) indicator.className="active";
      indicators.appendChild(indicator);
    }

    fadeInActiveSlide();
  }

  function fadeInActiveSlide(){
    const activeSlide = document.querySelector(".carousel-item.active");
    if(!activeSlide) return;
    const cards = activeSlide.querySelectorAll(".testimonial-card");
    cards.forEach((card,index)=>setTimeout(()=>card.classList.add("show"), index*200));
  }

  const carousel = document.getElementById("testimonialCarousel");
  if(carousel){
    carousel.addEventListener('slide.bs.carousel', ()=>document.querySelectorAll(".testimonial-card").forEach(c=>c.classList.remove("show")));
    carousel.addEventListener('slid.bs.carousel', fadeInActiveSlide);
  }

  generateTestimonials();

});

// solution for duplication
// Navbar mobile toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar-nav');

navbarToggler.addEventListener('click', () => {
  navbarMenu.classList.toggle('show');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarMenu.classList.contains('show')) {
      navbarMenu.classList.remove('show');
    }
  });
});

// chatbox.js

document.addEventListener('DOMContentLoaded', function () {
  const chatPrompt = document.getElementById('chat-prompt');

  // Show chatbox after 2 seconds
  setTimeout(() => {
    if (chatPrompt) chatPrompt.classList.add('show');
  }, 2000);

  // Close button
  window.closeChatPrompt = function () {
    if (chatPrompt) chatPrompt.style.display = 'none';
  }

  // WhatsApp redirect when a radio button is clicked
  const chatOptions = document.querySelectorAll('input[name="chat-option"]');

  chatOptions.forEach(option => {
    option.addEventListener('click', () => {
      let message = "";
      switch(option.id){
        case "option1":
          message = "Hi, I am interested in Web / Mobile App Development.";
          break;
        case "option2":
          message = "Hi, I am interested in AI / Automation Solutions.";
          break;
        case "option3":
          message = "Hi, I am interested in Digital Marketing & Branding.";
          break;
        case "option4":
          message = "Hi, I have a general inquiry.";
          break;
      }

      const whatsappURL = `https://wa.me/923390095589?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    });
  });
});

// cta
document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Particle Effect
  // ========================
  const canvas = document.getElementById('ctaParticles');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const particles = [];
  const particleCount = 50;

  function Particle() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 3 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.color = "rgba(255, 255, 255, 0.3)";
  }

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    this.draw();
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  animate();

  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  // ========================
  // Scroll reveal for CTA
  // ========================
  const ctaSection = document.getElementById('cta-contact');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ctaSection.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  observer.observe(ctaSection);
});

