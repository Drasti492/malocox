'use strict';

/* ---------------- SIDEBAR ---------------- */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

/* ---------------- CHATBOT ---------------- */
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotBody = document.querySelector('.chatbot-body');

chatbotToggle.addEventListener('click', () => {
  chatbot.classList.toggle('hidden');
});

chatbotClose.addEventListener('click', () => {
  chatbot.classList.add('hidden');
});

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && chatbotInput.value.trim()) {
    const msg = chatbotInput.value.toLowerCase();
    chatbotBody.innerHTML += `<p><strong>You:</strong> ${chatbotInput.value}</p>`;

    let reply = "You can explore my work in the portfolio section.";
    if (msg.includes('skills')) reply = "I focus on web development, digital design, and media production.";
    if (msg.includes('contact')) reply = "Use the contact form or email listed on this site.";

    chatbotBody.innerHTML += `<p>${reply}</p>`;
    chatbotInput.value = '';
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }
});

/* ---------------- PAGE NAVIGATION ---------------- */
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(btn => btn.classList.remove('active'));

    pages[index].classList.add('active');
    link.classList.add('active');

    window.scrollTo(0, 0);
  });
});

/* ---------------- COLOR MODE ---------------- */
const pageBody = document.body;
const blackModeBtn = document.getElementById('black-mode');
const greyModeBtn = document.getElementById('grey-mode');
const whiteModeBtn = document.getElementById('white-mode');

if (blackModeBtn && greyModeBtn && whiteModeBtn) {
  blackModeBtn.onclick = () => {
    pageBody.className = 'black-mode';
  };

  greyModeBtn.onclick = () => {
    pageBody.className = 'grey-mode';
  };

  whiteModeBtn.onclick = () => {
    pageBody.className = 'white-mode';
  };
}

/* ---------------- CONTACT FORM ---------------- */
const contactForm = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

contactForm.addEventListener('submit', async () => {
  const btn = contactForm.querySelector('.form-btn');
  btn.disabled = true;
  btn.innerText = 'Sending...';

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      statusEl.textContent = 'Message sent successfully!';
      contactForm.reset();
    } else {
      throw new Error();
    }
  } catch {
    statusEl.textContent = 'Failed to send message.';
  } finally {
    btn.disabled = false;
    btn.innerText = 'Send Message';
  }
});
