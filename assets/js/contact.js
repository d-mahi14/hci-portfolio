/**
 * CONTACT FORM VALIDATION & INTELLIGENT DISPATCH
 * 
 * Sourced strictly for desaihmahi@gmail.com
 * Provides immediate pre-filled email dispatch via mailto.
 * If a Formspree ID is later supplied, it seamlessly switches to background AJAX.
 */

const ContactController = (function() {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/placeholder_form_id';
  const TARGET_EMAIL = 'desaihmahi@gmail.com';

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    [nameInput, emailInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', handleFormSubmit);
  }

  function validateField(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    let isValid = true;
    let errorMsg = '';

    if (input.id === 'contact-name') {
      if (!input.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your name.';
      } else if (input.value.trim().length < 2) {
        isValid = false;
        errorMsg = 'Name must be at least 2 characters.';
      }
    } else if (input.id === 'contact-email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your email address.';
      } else if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (input.id === 'contact-message') {
      if (!input.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your message.';
      } else if (input.value.trim().length < 5) {
        isValid = false;
        errorMsg = 'Message should be at least 5 characters long.';
      }
    }

    if (!isValid) {
      input.classList.add('invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add('visible');
      }
    } else {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }

    return isValid;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const successBanner = document.getElementById('form-success-banner');
    const errorBanner = document.getElementById('form-error-banner');

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    // Hide previous banners
    if (successBanner) {
      successBanner.style.display = 'none';
      successBanner.className = 'form-feedback-banner';
    }
    if (errorBanner) {
      errorBanner.style.display = 'none';
      errorBanner.className = 'form-feedback-banner';
    }

    // Check if endpoint is still placeholder
    const isPlaceholder = FORMSPREE_ENDPOINT.includes('placeholder_form_id');

    if (isPlaceholder) {
      // Trigger default email app with pre-filled content
      const subject = encodeURIComponent('Portfolio Inquiry from ' + nameInput.value.trim());
      const body = encodeURIComponent(
        messageInput.value.trim() + 
        '\n\n---\nFrom: ' + nameInput.value.trim() + 
        ' (' + emailInput.value.trim() + ')'
      );
      const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      if (successBanner) {
        successBanner.className = 'form-feedback-banner success';
        successBanner.innerHTML = `
          <strong>✓ Message drafted!</strong><br>
          Your email application has been opened with your message ready to send to <strong>${TARGET_EMAIL}</strong>.
        `;
        successBanner.style.display = 'block';
        successBanner.focus();
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      return;
    }

    // If real Formspree endpoint is configured, send via AJAX
    try {
      const formData = new FormData(form);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        if (successBanner) {
          successBanner.className = 'form-feedback-banner success';
          successBanner.innerHTML = '✓ Thank you! Your message was delivered successfully. I will get back to you shortly.';
          successBanner.style.display = 'block';
          successBanner.focus();
        }
        form.reset();
      } else {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
    } catch (err) {
      console.warn('Submission error:', err.message);
      if (errorBanner) {
        const subject = encodeURIComponent('Portfolio Inquiry from ' + nameInput.value.trim());
        const body = encodeURIComponent(messageInput.value.trim());
        errorBanner.className = 'form-feedback-banner error';
        errorBanner.innerHTML = `
          <strong>Message could not be sent directly.</strong><br>
          Please send an email directly to: 
          <a href="mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}" style="text-decoration: underline; font-weight: 700; color: inherit;">
            ${TARGET_EMAIL}
          </a>.
        `;
        errorBanner.style.display = 'block';
        errorBanner.focus();
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }

  return { init };
})();
