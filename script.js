const swiper = new Swiper(".mySwiper1", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  lazy: {
    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
    loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
  },
});

document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with class 'lazy-bg'
  const lazyBgElements = document.querySelectorAll('.lazy-bg');

  // Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const bgUrl = target.getAttribute('data-bg');

        // Set background image and remove 'lazy-bg' class
        if (bgUrl) {
          target.style.backgroundImage = `url(${bgUrl})`;
          target.classList.remove('lazy-bg');
          observer.unobserve(target); // Stop observing once loaded
        }
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1 // Adjust as needed
  });

  // Start observing each lazy-bg element
  lazyBgElements.forEach(element => {
    observer.observe(element);
  });
});


// Gallery
var mySwiper = new Swiper(".mySwiper2", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 5000, // Adjust the delay in milliseconds (ms) as needed
    disableOnInteraction: false, // Allow autoplay to continue even when user interacts with swiper
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
  },
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  lazy: {
    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
    loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
  },
});

//AboutUS
const abtElement = document.querySelector(".abt");
const abtObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, { opacity: 1, duration: 1 });
      abtObserver.unobserve(entry.target);
    }
  });
});

abtObserver.observe(abtElement);

//Counter
const counterSection = document.querySelector(".card");
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      incrementNumbers();
      setInterval(incrementNumbers, 100);
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(counterSection);

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, { opacity: 1, duration: 1 });
      cardObserver.unobserve(entry.target);
    }
  });
});

cards.forEach((card) => {
  cardObserver.observe(card);
});

const targets = {
  years: 25,
  projects: 54,
  ongoing: 4,
};

function incrementNumbers() {
  Object.keys(targets).forEach((key) => {
    const element = document.getElementById(key);
    const count = parseInt(element.textContent);
    if (count < targets[key]) {
      element.textContent = count + 1;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll(".nav__list-item");

  const hamburger = document.querySelector(".ham");

  const nav = document.querySelector(".nav");

  // Function to set opacity of vertical indicator

  function setIndicatorOpacity(opacity) {
    const activeNavItem = document.querySelector(".nav__list-item.active-nav");

    if (activeNavItem) {
      const anchorElement = activeNavItem.querySelector("a");

      if (anchorElement) {
        anchorElement.style.opacity = opacity;
      }
    }
  }

  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();

    nav.classList.toggle("nav-active");

    document.body.classList.toggle("nav-active");

    if (nav.classList.contains("nav-active")) {
      setTimeout(() => {
        setIndicatorOpacity(1); // Show vertical indicator after delay
      }, 300); // Adjust the delay to match your transition duration
    } else {
      setIndicatorOpacity(0); // Hide vertical indicator when closing nav
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.stopPropagation();

      document.body.classList.remove("nav-active");

      nav.classList.remove("nav-active");

      navLinks.forEach((item) => {
        item.classList.remove("active-nav");
      });

      link.classList.add("active-nav"); // Add 'active-nav' dynamically

      setIndicatorOpacity(0); // Hide vertical indicator when clicking a link

      hamburger.classList.remove("active");
    });
  });

  // Close nav when clicking outside of it

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav") && !event.target.matches(".ham")) {
      nav.classList.remove("nav-active");

      document.body.classList.remove("nav-active");

      setIndicatorOpacity(0);

      hamburger.classList.remove("active");
    }
  });

  // Close nav when scrolling

  window.addEventListener("scroll", () => {
    nav.classList.remove("nav-active");

    document.body.classList.remove("nav-active");

    setIndicatorOpacity(0);

    hamburger.classList.remove("active");
  });

  // Close nav when changing orientation

  window.addEventListener("orientationchange", () => {
    nav.classList.remove("nav-active");

    document.body.classList.remove("nav-active");

    setIndicatorOpacity(0);

    hamburger.classList.remove("active");
  });

  // Close nav when zooming

  window.addEventListener("resize", () => {
    nav.classList.remove("nav-active");

    document.body.classList.remove("nav-active");

    setIndicatorOpacity(0);

    hamburger.classList.remove("active");
  });
});

// Get the span element by its id
const currentYearSpan = document.getElementById("currentYear");

// Get the current year
const currentYear = new Date().getFullYear();

// Set the current year to the span element
currentYearSpan.textContent = currentYear;

//Scrolling

const navbar = document.querySelector(".navbar");
let isScrolling = false;
let timeout;

// Function to slide the navbar up
function slideUpNavbar() {
  gsap.to(navbar, { y: "-100%", duration: 0.5, ease: "power2.inOut" });
}

// Function to slide the navbar down
function slideDownNavbar() {
  gsap.to(navbar, { y: "0%", duration: 0.5, ease: "power2.inOut" });
}

// Function to handle the scroll event
function handleScroll() {
  if (!isScrolling) {
    // Slide the navbar up if scrolling stopped
    slideUpNavbar();
  }
  isScrolling = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    // Slide the navbar down when scrolling stops
    slideDownNavbar();
    isScrolling = false;
  }, 250);
}

// Add event listener for the scroll event
window.addEventListener("scroll", handleScroll);
