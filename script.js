//**Selected Elements
const hamBurger = document.getElementById("ham-burger");
const fixedNav = document.getElementById("fixed-nav");
const closeBtnNav = document.getElementById("close-btn-nav");
const line1 = document.getElementById("line-1");
const line2 = document.getElementById("line-2");
const line3 = document.getElementById("line-3");
const slidingFeaturesRow = document.getElementById("sliding-features-row");
const nav = document.querySelector(".nav-bar");
const sections = document.querySelectorAll(".section");
const tabsContainer = document.querySelector(".operations-tab-container");
const tabs = document.querySelectorAll(".operation-tab");
const operationLg = document.querySelectorAll(".operation-tab-lg");
const operationContainerLg = document.querySelector(".operation-container-lg");
const faqContainer = document.querySelector(".faq-container");

//**Displaying Nav for mobile
hamBurger.addEventListener("click", function () {
  fixedNav.classList.remove("hidden");
});

//**Closing nav for mobile
closeBtnNav.addEventListener("click", function () {
  fixedNav.classList.add("hidden");
});

//**Sliding animation for the icons
const initialLTR = -48 * 4;
const initialRTL = 36 * 4;
const slider = function (element, LTR, speed) {
  const slide = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    if (entry.isIntersecting) {
      document.addEventListener("scroll", scroll);
    } else {
      document.removeEventListener("scroll", scroll);
    }
  };
  const Intersection = new IntersectionObserver(slide);
  Intersection.observe(element);
  const scroll = function () {
    const translate =
      (window.innerHeight - element.getBoundingClientRect().top) * speed;

    let totalTranslate = 0;
    if (LTR) {
      totalTranslate = translate + initialLTR;
    } else {
      totalTranslate = -(translate + initialRTL);
    }

    element.style.transform = `translateX(${totalTranslate}px)`;
  };
};
slider(line1, true, 0.15);
slider(line2, false, 0.15);
slider(line3, true, 0.15);

//**Menue fade animation
const hoverHandler = function (e, opacity) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;

    const siblings = link.closest(".nav-bar").querySelectorAll(".nav-link");

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      } else {
        el.style.transform = "scale(1.1) translateY(-2px)";
      }
    });
  }
};

const resetHandler = function () {
  const sibling = nav.querySelectorAll(".nav-link");
  sibling.forEach((s) => {
    s.style.opacity = 1;
    s.style.transform = "none";
  });
};

nav.addEventListener("mouseover", hoverHandler.bind(0.5));
nav.addEventListener("mouseout", resetHandler);

// **Revealing elements on scroll
const revealScroll = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");

  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealScroll, {
  root: null,
  threshold: 0,
});
sections.forEach((el) => {
  el.classList.add("section-hidden");
  sectionObserver.observe(el);
});

//**Handling tabbed pricing on mobile
const tabsContent = document.querySelectorAll(".operation-content");
tabsContainer.addEventListener("click", function (e) {
  //Selecting the clicked element
  const clicked = e.target.closest(
    ".operation-tab-1, .operation-tab-2, .operation-tab-3"
  );
  //Guard clause
  if (!clicked) return;
  //Removing active class if any
  tabs.forEach((tab, i) => {
    tab.classList.remove(`mb-active-${i + 1}`);
  });
  //Adding active class on the clicked tab
  const tabNumber = clicked.dataset.tab;
  if (tabNumber) {
    clicked.classList.add(`mb-active-${tabNumber}`);
  }
  //Displaying the content on click
  tabsContent.forEach((content) => {
    content.classList.add("hidden");
  });
  const clikcedContent = document.querySelector(
    `.operation-content-${tabNumber}`
  );
  clikcedContent.classList.remove("hidden");
  clikcedContent.classList.add("flex", "flex-col");
});

//**Pricing section for larger screens

operationContainerLg.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operation-tab-lg");
  console.log(clicked);
  if (!clicked) return;
  operationLg.forEach((tab) => {
    tab.classList.remove("lg-active");
  });
  clicked.classList.add("lg-active");
});

//**Faq section
const faqs = document.querySelectorAll(".faq");
faqContainer.addEventListener("click", function (e) {
  let clicked = null;
  if (e.target.closest(".faq")) {
    clicked = e.target.closest(".faq");
  }
  if (!clicked) return;
  const answer = clicked.nextElementSibling; // <dd class="aa">
  const icon = clicked.querySelector("i");
  if (answer && answer.classList.contains("aa")) {
    answer.classList.toggle("hidden");
  }

  if (answer.classList.contains("hidden")) {
    icon.classList.remove("-rotate-180");
  } else {
    icon.classList.add("-rotate-180");
  }
});
