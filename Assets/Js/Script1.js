document.addEventListener('DOMContentLoaded', function () {
  const aboutSection = document.getElementById('about-us');
  const aboutImg = document.getElementById('aboutImg');
  const aboutText = document.querySelector('.about-text');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate image
        aboutImg.style.opacity = 1;
        aboutImg.style.transform = 'translateX(0) scale(1.05)';

        // Animate text
        aboutText.style.opacity = 1;
        aboutText.style.transform = 'translateX(0)';

        // Match image height to text height
        aboutImg.style.maxHeight = aboutText.offsetHeight + 'px';
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);

  // Adjust image height on resize
  window.addEventListener('resize', () => {
    aboutImg.style.maxHeight = aboutText.offsetHeight + 'px';
  });
});


// Sample Blog Data
const blogs = [
  {
    img: "Assets/pic/RADC software development.jpeg",
    title: "Streamlining Construction Operations with a Scalable Inventory & Financial Tracking System",
    desc: "Alliance Software Solution developed a scalable, role-based Construction Inventory & Financial Tracking System for web and mobile. It streamlines material requests, approvals, purchase orders, inventory updates, and financial tracking across multiple projects. With real-time syncing, mobile access, and role-specific dashboards, construction teams can manage operations efficiently and reduce errors.",
    meta: { author: "AllianceSoft Team", date: "Oct 7, 2025", tag: "Construction Tech, Inventory Management, Financial Tracking" }
  },
  {
    img: "Assets/pic/nursing website.jpeg",
    title: "Revolutionizing NCLEX-RN Exam Preparation",
    desc: "Alliance Software Solution developed a comprehensive NCLEX-RN Preparation Platform for nursing students and healthcare professionals. It offers interactive modules, adaptive quizzes, full-length simulations, and personalized performance analytics. With progress tracking, social learning, and tiered subscription plans, students can efficiently prepare for the NCLEX-RN exam while staying engaged and motivated.",
    meta: { author: "Admin", date: "Sep 20, 2025", tag: "AI" }
  },
  {
    img: "Assets/pic/RADC dashboard.jpeg",
    title: "Streamlining Construction Operations with a Scalable Inventory & Financial Tracking System",
    desc: "Alliance Software Solution developed a scalable, role-based Construction Inventory & Financial Tracking System for web and mobile. It streamlines material requests, approvals, purchase orders, inventory updates, and financial tracking across multiple projects. With real-time syncing, mobile access, and role-specific dashboards, construction teams can manage operations efficiently and reduce errors.",
    meta: { author: "AllianceSoft Team", date: "Oct 7, 2025", tag: "Construction Tech, Inventory Management, Financial Tracking" }
  },
  {
    img: "Assets/pic/nursing dashboard.jpeg",
    title: "Revolutionizing NCLEX-RN Exam Preparation",
    desc: "Alliance Software Solution developed a comprehensive NCLEX-RN Preparation Platform for nursing students and healthcare professionals. It offers interactive modules, adaptive quizzes, full-length simulations, and personalized performance analytics. With progress tracking, social learning, and tiered subscription plans, students can efficiently prepare for the NCLEX-RN exam while staying engaged and motivated.",
    meta: { author: "Admin", date: "Sep 20, 2025", tag: "AI" }
  },
];

let currentPage = 1;
const blogsPerPage = 2;

function displayBlogs() {
  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  const blogContainer = document.getElementById("blog-list");
  blogContainer.innerHTML = "";

  blogs.slice(start, end).forEach(blog => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card fade-in";
    blogCard.innerHTML = `
      <div class="blog-img-wrapper">
        <img src="${blog.img}" alt="${blog.title}" class="blog-img">
        <div class="blog-overlay">
          <a href="#" class="btn-readmore-overlay">Read More</a>
        </div>
      </div>
      <div class="blog-meta">
        <span><i class="fas fa-user"></i> ${blog.meta.author}</span>
        <span><i class="fas fa-calendar-alt"></i> ${blog.meta.date}</span>
        <span><i class="fas fa-tag"></i> ${blog.meta.tag}</span>
      </div>
      <h4 class="blog-title">${blog.title}</h4>
      <p class="blog-desc">${blog.desc}</p>
    `;
    blogContainer.appendChild(blogCard);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = (i === currentPage) ? "active" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      displayBlogs();
    });
    pagination.appendChild(btn);
  }
}

// Initialize
displayBlogs();
AOS.init();

// Smooth scroll for anchor links

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  this.reset();
});

// Newsletter Form Submission
document.getElementById('newsletterForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Subscribed successfully!');
  this.reset();
});


// contact us page js
document.addEventListener('DOMContentLoaded', () => {
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form');

  window.addEventListener('scroll', () => {
    const triggerPoint = window.innerHeight - 100;
    const infoTop = contactInfo.getBoundingClientRect().top;
    const formTop = contactForm.getBoundingClientRect().top;

    if(infoTop < triggerPoint) contactInfo.classList.add('slide-in-left');
    if(formTop < triggerPoint) contactForm.classList.add('slide-in-right');
  });
});

// project page js
const projects = [
  {
    title: "Construction Inventory System",
    subtitle: "FRD Demand & Financial Tracking System for Construction Sites",
    description: `We developed a scalable, role-based FRD Demand & Financial Tracking System for web and mobile, tailored for construction companies to streamline material demand workflows, purchase orders, inventory, and financial records across multiple projects and user roles. ... Built using React, Node.js, PostgreSQL, and AWS.`,
    images: ["assets/pic/project1-1.jpg","assets/pic/project1-2.jpg","assets/pic/project1-3.jpg"]
  },
  {
    title: "Nursing Training Platform",
    subtitle: "NCLEX-RN Preparation Platform",
    description: `We developed a robust, scalable NCLEX Preparation Platform designed for nursing students and healthcare professionals preparing for the NCLEX-RN exam. ...`,
    images: ["assets/pic/project2-1.jpg","assets/pic/project2-2.jpg"]
  },
  {
    title: "Fasting, Diet & Health Tracking Mobile App",
    subtitle: "Cross-platform Fasting and Diet Tracking App",
    description: `Cross-platform Fasting and Diet Tracking Mobile App for Android and iOS. Personalized meal plans, fasting schedules, calorie tracking, fitness logging, subscription features, and an admin panel. ...`,
    images: ["assets/pic/project3-1.jpg","assets/pic/project3-2.jpg"]
  },
  {
    title: "Diet30 Website",
    subtitle: "Fasting & Diet Tracking Website",
    description: `Diet30 is a web platform version of the Fasting and Diet Tracking app. Tracks meals, fasting, calories, and fitness progress. Subscription-based premium features and dashboards.`,
    images: ["assets/pic/project4-1.jpg","assets/pic/project4-2.jpg"]
  }
];

// Render project cards
const projectList = document.getElementById("project-list");
projects.forEach((proj, index) => {
  const col = document.createElement("div");
  col.className = "col-lg-3 col-md-6 mb-4";
  col.innerHTML = `
    <div class="project-card" data-index="${index}" data-bs-toggle="modal" data-bs-target="#projectModal">
      <div class="project-thumb">
        <img src="${proj.images[0]}" alt="${proj.title}">
      </div>
      <div class="project-content">
        <a class="category">${proj.subtitle}</a>
        <h5>${proj.title}</h5>
      </div>
    </div>
  `;
  projectList.appendChild(col);
});

// Modal HTML
const modalHTML = `
<div class="modal fade" id="projectModal" tabindex="-1">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div id="modalCarousel" class="carousel slide mb-3" data-bs-ride="carousel">
          <div class="carousel-inner" id="modal-images"></div>
          <button class="carousel-control-prev" type="button" data-bs-target="#modalCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#modalCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
        <p id="modal-description"></p>
      </div>
    </div>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImages = document.getElementById("modal-images");

// Show modal with selected project
projectList.addEventListener("click", function(e){
  const card = e.target.closest(".project-card");
  if(!card) return;
  const index = card.dataset.index;
  const proj = projects[index];

  modalTitle.textContent = proj.title;
  modalDescription.textContent = proj.description;
  modalImages.innerHTML = proj.images.map((img, i) => `
    <div class="carousel-item ${i===0?'active':''}">
      <img src="${img}" class="d-block w-100" alt="${proj.title}">
    </div>
  `).join('');
});
const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));

