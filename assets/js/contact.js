/**
 * CONTACT FORM VALIDATION & HONEST CLOSURE DISPATCH
 * 
 * [HCI - Shneiderman #4: Design dialogs to yield closure]
 * [HCI - Nielsen #1: Visibility of system status]
 * [HCI - Nielsen #9: Help users recognize, diagnose, and recover from errors]
 * [HCI - WCAG 4.1.3: Status messages via role="status" and role="alert"]
 * 
 * Real Behavior Implementation:
 * a) While sending: disables submit button, displays "Sending..." with aria-busy="true".
 * b) On confirmed HTTP 2xx from Formspree API: displays inline confirmed success message in role="status", clears form, shifts focus to status.
 * c) On failure/network error: shows error in role="alert", preserves user's typed input, provides mailto fallback link.
 * d) If placeholder endpoint is active (mailto dispatch): explicitly states that it opens the user's email app, and NEVER claims "Message delivered" or "Message sent".
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
        errorMsg = 'Please enter a valid email address (e.g. name@domain.com).';
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

    // [HCI - Nielsen #1: Visibility of system status]
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
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

    const isPlaceholder = FORMSPREE_ENDPOINT.includes('placeholder_form_id');

    // Case D: Only mailto is configured -> Honest closure: tell user it opens their email app
    if (isPlaceholder) {
      const subject = encodeURIComponent('Portfolio Inquiry from ' + nameInput.value.trim());
      const body = encodeURIComponent(
        messageInput.value.trim() + 
        '\n\n---\nFrom: ' + nameInput.value.trim() + 
        ' (' + emailInput.value.trim() + ')'
      );
      const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      // Honest closure: never say "message delivered"
      if (successBanner) {
        successBanner.className = 'form-feedback-banner success';
        successBanner.innerHTML = `
          <strong>✓ Opening your email application...</strong><br>
          This drafts your message addressed to <strong>${TARGET_EMAIL}</strong> in your default email client. Please click 'Send' in your mail program to complete delivery.
        `;
        successBanner.style.display = 'block';
        successBanner.focus();
      }

      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnText;
      return;
    }

    // Case B & C: Real Formspree service configured
    try {
      const formData = new FormData(form);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Case B: Confirmed HTTP 2xx delivery
        if (successBanner) {
          successBanner.className = 'form-feedback-banner success';
          successBanner.innerHTML = '<strong>✓ Message delivered successfully!</strong> Thank you for reaching out; I will respond to your inquiry shortly.';
          successBanner.style.display = 'block';
          successBanner.focus();
        }
        form.reset();
      } else {
        throw new Error(`Server returned status ${response.status}`);
      }
    } catch (err) {
      // Case C: Failure/Network error -> preserve input, offer mailto fallback
      console.warn('Formspree dispatch error:', err.message);
      if (errorBanner) {
        const subject = encodeURIComponent('Portfolio Inquiry from ' + nameInput.value.trim());
        const body = encodeURIComponent(messageInput.value.trim());
        errorBanner.className = 'form-feedback-banner error';
        errorBanner.innerHTML = `
          <strong>Message could not be sent through web endpoint (${err.message}).</strong><br>
          Your typed message has been retained above. You can send it directly via email to: 
          <a href="mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}" style="text-decoration: underline; font-weight: 700; color: inherit;">
            ${TARGET_EMAIL}
          </a>.
        `;
        errorBanner.style.display = 'block';
        errorBanner.focus();
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnText;
    }
  }

  return { init };
})();
