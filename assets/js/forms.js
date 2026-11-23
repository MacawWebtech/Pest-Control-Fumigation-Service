/**
 * DEFENDRA - PEST CONTROL & FUMIGATION SERVICE
 * Form Validation, Feedback & Static Submission Simulation Engine
 * Respects Static Template Honesty: Simulates client-side request validation with realistic response feedback
 * Vanilla ES6+, no global pollution, zero console.log
 */

(() => {
  'use strict';

  // --- Utility: Toast Notification ---
  const showToast = (message, title = 'Inspection Request Notice') => {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
        pointer-events: none;
      `;
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'defendra-toast';
    toast.style.cssText = `
      background-color: var(--color-charcoal, #202723);
      color: var(--color-ivory, #F4F1E8);
      border-left: 4px solid var(--color-yellow, #E5C747);
      padding: 16px 20px;
      border-radius: 4px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      pointer-events: auto;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.875rem;
      line-height: 1.5;
      transform: translateY(20px);
      opacity: 0;
      transition: all 250ms ease-out;
    `;

    toast.innerHTML = `
      <div style="font-family: var(--font-heading, sans-serif); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-yellow, #E5C747); margin-bottom: 4px;">
        ${title}
      </div>
      <div>${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  };

  // --- Field Validator ---
  const validateField = (input) => {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    } else if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    } else if (input.type === 'tel' && value) {
      const phoneRegex = /^[\d\s+\-()]{7,16}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid telephone number (7-15 digits).';
      }
    }

    // Toggle error class and feedback message
    const parentGroup = input.closest('.form-group') || input.parentElement;
    let feedback = parentGroup ? parentGroup.querySelector('.form-feedback-error') : null;

    if (!isValid) {
      input.classList.add('is-invalid');
      if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'form-feedback-error';
        parentGroup.appendChild(feedback);
      }
      feedback.textContent = errorMessage;
    } else {
      input.classList.remove('is-invalid');
      if (feedback) {
        feedback.textContent = '';
      }
    }

    return isValid;
  };

  // --- General Forms Handler ---
  const initFormValidation = () => {
    const forms = document.querySelectorAll('form[data-validate="true"], .validate-form');

    forms.forEach((form) => {
      // Real-time input clearing
      form.addEventListener('input', (e) => {
        if (e.target.matches('input, select, textarea')) {
          if (e.target.classList.contains('is-invalid')) {
            validateField(e.target);
          }
        }
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input, select, textarea');
        let formIsValid = true;

        inputs.forEach((input) => {
          if (!validateField(input)) {
            formIsValid = false;
          }
        });

        if (!formIsValid) {
          showToast('Please correct the highlighted fields before submitting.', 'Validation Alert');
          return;
        }

        // Simulate submission with button state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
            Processing Request...
          `;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }

          // Reset form fields
          form.reset();

          // Show static template honesty notice
          showToast(
            'Demo mode: Your inspection enquiry was captured locally for preview. In a production deployment, this submits to your backend API.',
            'Request Logged (Demo)'
          );

          // If form contains a success banner container
          const successBanner = form.querySelector('.form-success-message');
          if (successBanner) {
            successBanner.style.display = 'block';
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 1200);
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormValidation);
  } else {
    initFormValidation();
  }
})();
