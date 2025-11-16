'use strict';

// Sidebar Toggle
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

// Chatbot Toggle
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotBody = document.querySelector(".chatbot-body");

chatbotToggle.addEventListener("click", function() { chatbot.classList.toggle("hidden"); });
chatbotClose.addEventListener("click", function() { chatbot.classList.add("hidden"); });

chatbotInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && chatbotInput.value.trim()) {
        const userMessage = chatbotInput.value.trim();
        const userP = document.createElement("p");
        userP.textContent = `You: ${userMessage}`;
        userP.style.color = "var(--light-gray)";
        chatbotBody.appendChild(userP);

        const botP = document.createElement("p");
        botP.style.color = "var(--light-gray)";
        if (userMessage.toLowerCase().includes("skills")) {
            botP.textContent = "I specialize in JavaScript, TypeScript, React, Python, HTML/CSS, videography, DJing, and video editing!";
        } else if (userMessage.toLowerCase().includes("project")) {
            botP.textContent = "Check out my portfolio for web development, videography, and music projects!";
        } else {
            botP.textContent = "I'm here to help! Ask about my skills or projects.";
        }
        chatbotBody.appendChild(botP);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        chatbotInput.value = "";
    }
});

// Color Mode Toggle
const blackModeBtn = document.getElementById("black-mode");
const greyModeBtn = document.getElementById("grey-mode");
const whiteModeBtn = document.getElementById("white-mode");
const body = document.body;

blackModeBtn.addEventListener("click", function() {
    body.classList.remove("grey-mode", "white-mode");
    body.classList.add("black-mode");
    blackModeBtn.style.display = "none";
    greyModeBtn.style.display = "block";
    whiteModeBtn.style.display = "block";
});

greyModeBtn.addEventListener("click", function() {
    body.classList.remove("black-mode", "white-mode");
    body.classList.add("grey-mode");
    greyModeBtn.style.display = "none";
    blackModeBtn.style.display = "block";
    whiteModeBtn.style.display = "block";
});

whiteModeBtn.addEventListener("click", function() {
    body.classList.remove("black-mode", "grey-mode");
    body.classList.add("white-mode");
    whiteModeBtn.style.display = "none";
    blackModeBtn.style.display = "block";
    greyModeBtn.style.display = "block";
});

// Contact Form Submission
// ---------- CONTACT FORM (Formspree) ----------
const contactForm = document.getElementById('contact-form');
const statusEl    = document.getElementById('form-status');

contactForm.addEventListener('submit', async function (e) {
  // Let Formspree handle the POST, we only show feedback
  const btn = contactForm.querySelector('.form-btn');
  btn.disabled = true;
  btn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending…</span>';

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      statusEl.textContent = ' Message sent – check your Gmail!';
      statusEl.style.color = 'var(--green)';
      contactForm.reset();
    } else {
      throw new Error();
    }
  } catch (err) {
    statusEl.textContent = ' Something went wrong. Try again or email me directly.';
    statusEl.style.color = 'var(--red)';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
  }
});

// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function() {
        for (let j = 0; j < pages.length; j++) {
            if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }
    });
}

// Portfolio Filter
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function(selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue.toLowerCase() === filterItems[i].dataset.category.toLowerCase()) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
};

select.addEventListener("click", function() { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}