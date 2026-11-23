/**
 * DEFENDRA - PEST CONTROL & FUMIGATION SERVICE
 * 6-Step Multi-Step Inspection Request Wizard Engine
 * Handles step navigation, step validation, file inspection, dynamic cost estimate, and submission redirection
 * Vanilla ES6+, no global pollution, zero console.log
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'defendra_inspection_data';

  const wizardState = {
    currentStep: 1,
    totalSteps: 6,
    data: {
      pestType: 'termites',
      propertyType: 'residential_villa',
      propertySize: '1500',
      severity: 'moderate',
      photoFileName: '',
      preferredDate: '',
      timeWindow: 'morning',
      emergencyDispatch: false,
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientAddress: '',
      clientCity: '',
      clientPincode: '',
      estimatedCostRange: '₹3,499 - ₹4,999'
    }
  };

  // Base pricing calculator matrix for inspection estimates (in INR ₹)
  const calculateEstimate = () => {
    let baseMin = 1499;
    let baseMax = 2499;

    // Pest multiplier
    const pestMultipliers = {
      termites: 2.2,
      bed_bugs: 1.8,
      cockroaches: 1.2,
      rodents: 1.5,
      fumigation: 3.0,
      general: 1.0
    };
    const pMult = pestMultipliers[wizardState.data.pestType] || 1.0;

    // Property multiplier
    const sqft = parseInt(wizardState.data.propertySize, 10) || 1200;
    const sizeMult = sqft > 3000 ? 2.5 : sqft > 2000 ? 1.8 : sqft > 1200 ? 1.4 : 1.0;

    // Severity multiplier
    const sevMult = wizardState.data.severity === 'severe' ? 1.5 : wizardState.data.severity === 'moderate' ? 1.2 : 1.0;

    const calcMin = Math.round((baseMin * pMult * sizeMult * sevMult) / 100) * 100;
    const calcMax = Math.round((baseMax * pMult * sizeMult * sevMult) / 100) * 100;

    wizardState.data.estimatedCostRange = `₹${calcMin.toLocaleString('en-IN')} - ₹${calcMax.toLocaleString('en-IN')}`;
    return wizardState.data.estimatedCostRange;
  };

  // --- Step Validation ---
  const validateStep = (stepNumber) => {
    const pane = document.querySelector(`.wizard-pane[data-step="${stepNumber}"]`);
    if (!pane) return true;

    let isValid = true;
    const requiredInputs = pane.querySelectorAll('input[required], select[required], textarea[required]');

    requiredInputs.forEach((input) => {
      const val = input.value.trim();
      const parent = input.closest('.form-group') || input.parentElement;
      let feedback = parent.querySelector('.form-feedback-error');

      if (!val) {
        isValid = false;
        input.classList.add('is-invalid');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'form-feedback-error';
          parent.appendChild(feedback);
        }
        feedback.textContent = 'This field is required.';
      } else {
        input.classList.remove('is-invalid');
        if (feedback) feedback.textContent = '';
      }
    });

    // Custom validations per step
    if (stepNumber === 1) {
      const selectedPest = pane.querySelector('input[name="pest_type"]:checked');
      if (!selectedPest) {
        isValid = false;
        alert('Please select the target pest category.');
      } else {
        wizardState.data.pestType = selectedPest.value;
      }
    } else if (stepNumber === 2) {
      const propType = pane.querySelector('select[name="property_type"]') || pane.querySelector('input[name="property_type"]:checked');
      if (propType) wizardState.data.propertyType = propType.value;
      const propSize = pane.querySelector('input[name="property_size"]') || pane.querySelector('select[name="property_size"]');
      if (propSize) wizardState.data.propertySize = propSize.value;
    } else if (stepNumber === 3) {
      const sev = pane.querySelector('input[name="severity"]:checked');
      if (sev) wizardState.data.severity = sev.value;

      // File validation if uploaded
      const fileInput = pane.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
          isValid = false;
          alert('Allowed file formats: JPG, PNG, WEBP, PDF only.');
        } else if (file.size > maxSize) {
          isValid = false;
          alert('File size exceeds the 5MB limit.');
        } else {
          wizardState.data.photoFileName = file.name;
        }
      }
    } else if (stepNumber === 4) {
      const dateInput = pane.querySelector('input[name="preferred_date"]');
      if (dateInput && !dateInput.value) {
        isValid = false;
        dateInput.classList.add('is-invalid');
      } else if (dateInput) {
        wizardState.data.preferredDate = dateInput.value;
      }

      const slot = pane.querySelector('input[name="time_slot"]:checked');
      if (slot) wizardState.data.timeWindow = slot.value;
    } else if (stepNumber === 5) {
      const nameInp = pane.querySelector('input[name="client_name"]');
      const phoneInp = pane.querySelector('input[name="client_phone"]');
      const emailInp = pane.querySelector('input[name="client_email"]');
      const addrInp = pane.querySelector('[name="client_address"]');
      const cityInp = pane.querySelector('[name="client_city"]');
      const pinInp = pane.querySelector('input[name="client_pincode"]');

      if (nameInp) wizardState.data.clientName = nameInp.value.trim();
      if (phoneInp) wizardState.data.clientPhone = phoneInp.value.trim();
      if (emailInp) wizardState.data.clientEmail = emailInp.value.trim();
      if (addrInp) wizardState.data.clientAddress = addrInp.value.trim();
      if (cityInp) wizardState.data.clientCity = cityInp.value.trim();
      if (pinInp) wizardState.data.clientPincode = pinInp.value.trim();
    }

    return isValid;
  };

  // --- Render Step & Update UI ---
  const goToStep = (stepNumber) => {
    if (stepNumber < 1 || stepNumber > wizardState.totalSteps) return;

    wizardState.currentStep = stepNumber;

    // Panes toggle
    const panes = document.querySelectorAll('.wizard-pane');
    panes.forEach((pane) => {
      const pStep = parseInt(pane.getAttribute('data-step'), 10);
      if (pStep === stepNumber) {
        pane.classList.add('is-active');
      } else {
        pane.classList.remove('is-active');
      }
    });

    // Step Nodes update
    const nodes = document.querySelectorAll('.wizard-step-node');
    nodes.forEach((node) => {
      const nStep = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('is-active', 'is-completed');
      if (nStep === stepNumber) {
        node.classList.add('is-active');
      } else if (nStep < stepNumber) {
        node.classList.add('is-completed');
      }
    });

    // Progress Bar width
    const progressBar = document.querySelector('.wizard-progress__bar');
    if (progressBar) {
      const percent = ((stepNumber - 1) / (wizardState.totalSteps - 1)) * 100;
      progressBar.style.width = `${percent}%`;
      progressBar.style.setProperty('--p', String(percent / 100));
    }

    // Work-order docket: step counter + name
    const stepNow = document.getElementById('bkStepNow');
    const stepName = document.getElementById('bkStepName');
    if (stepNow) stepNow.textContent = String(stepNumber);
    if (stepName) {
      const activeNode = document.querySelector(`.wizard-step-node[data-step="${stepNumber}"] .bk-node__t`);
      if (activeNode) stepName.textContent = activeNode.textContent;
    }

    // Step Buttons State
    const prevBtn = document.querySelector('[data-wizard-action="prev"]');
    const nextBtn = document.querySelector('[data-wizard-action="next"]');
    const submitBtn = document.querySelector('[data-wizard-action="submit"]');

    if (prevBtn) {
      prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
    }
    const navBar = document.querySelector('.bk-nav');
    if (navBar) navBar.classList.toggle('is-first-step', stepNumber === 1);

    if (nextBtn && submitBtn) {
      if (stepNumber === wizardState.totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        // Populate Step 6 Review Pane
        populateReviewPane();
      } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
      }
    }

    // Scroll container smoothly to top of wizard
    const wizardForm = document.getElementById('inspectionWizardForm');
    if (wizardForm) {
      wizardForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // --- Populate Step 6 Review Summary ---
  const populateReviewPane = () => {
    calculateEstimate();

    const reviewPest = document.getElementById('reviewPestType');
    const reviewProp = document.getElementById('reviewProperty');
    const reviewDate = document.getElementById('reviewDateTime');
    const reviewContact = document.getElementById('reviewContact');
    const reviewEstimate = document.getElementById('reviewEstimateRange');

    if (reviewPest) reviewPest.textContent = wizardState.data.pestType.replace('_', ' ').toUpperCase();
    if (reviewProp) reviewProp.textContent = `${wizardState.data.propertyType.replace('_', ' ')} (${wizardState.data.propertySize} sq.ft)`;
    if (reviewDate) reviewDate.textContent = `${wizardState.data.preferredDate || 'Earliest Slot'} [${wizardState.data.timeWindow.toUpperCase()}]`;
    if (reviewContact) reviewContact.textContent = `${wizardState.data.clientName} | ${wizardState.data.clientPhone} (${wizardState.data.clientCity})`;
    if (reviewEstimate) reviewEstimate.textContent = wizardState.data.estimatedCostRange;
  };

  // --- Live work-order docket (reads the form, never blocks navigation) ---
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const syncDocket = () => {
    const form = document.getElementById('inspectionWizardForm');
    if (!form) return;

    const checked = (name) => form.querySelector(`input[name="${name}"]:checked`);
    const pest = checked('pest_type');
    const sev = checked('severity');
    const slot = checked('time_slot');
    const typeSel = form.querySelector('select[name="property_type"]');
    const sizeInp = form.querySelector('input[name="property_size"]');
    const dateInp = form.querySelector('input[name="preferred_date"]');

    if (pest) wizardState.data.pestType = pest.value;
    if (sev) wizardState.data.severity = sev.value;
    if (slot) wizardState.data.timeWindow = slot.value;
    if (typeSel) wizardState.data.propertyType = typeSel.value;
    if (sizeInp && sizeInp.value) wizardState.data.propertySize = sizeInp.value;

    const typeOpt = typeSel && typeSel.options[typeSel.selectedIndex];
    const sqft = parseInt(wizardState.data.propertySize, 10);
    const dateText = dateInp && dateInp.value
      ? new Date(`${dateInp.value}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
      : 'Date open';

    setText('bkSumPest', pest ? pest.dataset.short : '');
    setText('bkSumProperty', `${typeOpt ? typeOpt.dataset.short : ''} · ${Number.isNaN(sqft) ? '—' : sqft.toLocaleString('en-IN')} sq ft`);
    setText('bkSumSeverity', sev ? sev.dataset.short : '');
    setText('bkSumWindow', `${dateText} · ${slot ? slot.dataset.short : ''}`);
    setText('bkSumEstimate', `${calculateEstimate().replace(' - ', ' – ')}*`);
  };

  // --- Initialization ---
  const initWizard = () => {
    const wizardForm = document.getElementById('inspectionWizardForm');
    if (!wizardForm) return;

    // Date picker minimum constraint: Tomorrow's date
    const dateInput = wizardForm.querySelector('input[name="preferred_date"]');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Action button listeners
    document.addEventListener('click', (e) => {
      const nextAction = e.target.closest('[data-wizard-action="next"]');
      if (nextAction) {
        e.preventDefault();
        if (validateStep(wizardState.currentStep)) {
          goToStep(wizardState.currentStep + 1);
        }
        return;
      }

      const prevAction = e.target.closest('[data-wizard-action="prev"]');
      if (prevAction) {
        e.preventDefault();
        goToStep(wizardState.currentStep - 1);
        return;
      }
    });

    // Final Submission Handler
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateStep(wizardState.currentStep)) return;

      const submitBtn = wizardForm.querySelector('[data-wizard-action="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Request...';
      }

      // Generate Reference Code
      const refCode = 'STK-INSP-' + Math.floor(100000 + Math.random() * 900000);
      wizardState.data.referenceCode = refCode;
      wizardState.data.timestamp = new Date().toISOString();

      // Save to localStorage for confirmation page
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wizardState.data));

      setTimeout(() => {
        window.location.href = `inspection-confirmation.html?ref=${refCode}`;
      }, 800);
    });

    // Live docket + quick-fill chips + upload label
    wizardForm.addEventListener('input', syncDocket);
    wizardForm.addEventListener('change', syncDocket);

    wizardForm.querySelectorAll('.bk-chip[data-size]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const sizeInp = wizardForm.querySelector('input[name="property_size"]');
        if (sizeInp) {
          sizeInp.value = chip.getAttribute('data-size');
          sizeInp.classList.remove('is-invalid');
          syncDocket();
        }
      });
    });

    const fileInp = wizardForm.querySelector('input[type="file"]');
    const dropName = document.getElementById('bkDropName');
    if (fileInp && dropName) {
      fileInp.addEventListener('change', () => {
        dropName.textContent = fileInp.files.length ? fileInp.files[0].name : 'Choose a photo or PDF';
      });
    }

    // Go to initial step
    syncDocket();
    goToStep(1);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWizard);
  } else {
    initWizard();
  }
})();
