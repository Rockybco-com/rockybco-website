/* ═══════════════════════════════════════════════
   ROCKYBCO — CLIENT BRIEF JS
   Handles: multi-step navigation, validation,
   progress bar, summary, file upload, submit
═══════════════════════════════════════════════ */

const TOTAL_STEPS = 6;
let currentStep = 1;

/* ── SCREEN ELEMENTS ── */
const introScreen   = document.getElementById('intro-screen');
const formScreen    = document.getElementById('form-screen');
const successScreen = document.getElementById('success-screen');
const btnStart      = document.getElementById('btn-start');
const btnBack       = document.getElementById('btn-back');
const btnNext       = document.getElementById('btn-next');
const btnSubmit     = document.getElementById('btn-submit');
const progressFill  = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const briefForm     = document.getElementById('brief-form');

/* ── START BUTTON ── */
btnStart.addEventListener('click', () => {
  introScreen.classList.remove('active');
  formScreen.classList.add('active');
  updateProgress();
  updateNavButtons();
});

/* ── PROGRESS BAR ── */
function updateProgress() {
  const pct = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  progressFill.style.width = pct + '%';
  progressLabel.textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
}

/* ── SHOW / HIDE STEPS ── */
function showStep(step) {
  document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.form-step[data-step="${step}"]`);
  if (target) target.classList.add('active');
}

/* ── NAV BUTTONS ── */
function updateNavButtons() {
  // Back button
  btnBack.style.visibility = currentStep === 1 ? 'hidden' : 'visible';

  // Next / Submit toggle
  if (currentStep === TOTAL_STEPS) {
    btnNext.classList.add('hidden');
    btnSubmit.classList.remove('hidden');
  } else {
    btnNext.classList.remove('hidden');
    btnSubmit.classList.add('hidden');
  }

  // Build summary when landing on step 6
  if (currentStep === TOTAL_STEPS) buildSummary();
}

/* ── VALIDATION ── */
function validateStep(step) {
  let valid = true;
  clearErrors();

  if (step === 1) {
    valid = requireField('full-name')       && valid;
    valid = requireField('whatsapp')        && valid;
    valid = requireField('email')           && valid;
    valid = requireField('brand-name')      && valid;
    valid = requireSelect('industry')       && valid;
    valid = requireField('business-description') && valid;
  }

  if (step === 2) {
    valid = requireField('ideal-customer')  && valid;
    valid = requireField('problem-solved')  && valid;
    valid = requireCheckGroup('audience-location', 'Please select at least one location.') && valid;
  }

  if (step === 3) {
    valid = requireRadioGroup('brand-vibe', 'Please select a vibe.') && valid;
  }

  if (step === 4) {
    valid = requireField('competitors')     && valid;
    valid = requireField('differentiators') && valid;
    valid = requireRadioGroup('project-goal', 'Please select a goal.') && valid;
    valid = requireRadioGroup('brand-rating', 'Please rate your current brand.') && valid;
  }

  if (step === 5) {
    valid = requireCheckGroup('services-needed', 'Please select at least one service.') && valid;
    valid = requireRadioGroup('deadline', 'Please select a deadline.') && valid;
    valid = requireRadioGroup('budget', 'Please select a budget range.') && valid;
  }

  if (step === 6) {
    if (!document.getElementById('confirm-accuracy').checked) {
      showInlineError('confirm-accuracy', 'Please confirm the information is accurate.');
      valid = false;
    }
    if (!document.getElementById('confirm-confidential').checked) {
      showInlineError('confirm-confidential', 'Please confirm the confidentiality agreement.');
      valid = false;
    }
  }

  return valid;
}

function requireField(id) {
  const el = document.getElementById(id);
  if (!el) return true;
  if (!el.value.trim()) {
    el.classList.add('error');
    insertError(el, 'This field is required.');
    return false;
  }
  return true;
}

function requireSelect(id) {
  const el = document.getElementById(id);
  if (!el) return true;
  if (!el.value) {
    el.classList.add('error');
    insertError(el, 'Please make a selection.');
    return false;
  }
  return true;
}

function requireRadioGroup(name, msg) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  if (!checked) {
    const group = document.querySelector(`.radio-grid`);
    const allGroups = document.querySelectorAll('.radio-grid, .rating-row');
    // Find the specific group by checking its inputs
    for (const g of allGroups) {
      if (g.querySelector(`input[name="${name}"]`)) {
        const errEl = document.createElement('p');
        errEl.className = 'error-msg';
        errEl.textContent = msg;
        g.parentNode.appendChild(errEl);
        break;
      }
    }
    return false;
  }
  return true;
}

function requireCheckGroup(name, msg) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  if (!checked) {
    const allGrids = document.querySelectorAll('.check-grid');
    for (const g of allGrids) {
      if (g.querySelector(`input[name="${name}"]`)) {
        const errEl = document.createElement('p');
        errEl.className = 'error-msg';
        errEl.textContent = msg;
        g.parentNode.appendChild(errEl);
        break;
      }
    }
    return false;
  }
  return true;
}

function showInlineError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  const errEl = document.createElement('p');
  errEl.className = 'error-msg';
  errEl.textContent = msg;
  el.parentNode.parentNode.appendChild(errEl);
}

function insertError(el, msg) {
  const errEl = document.createElement('p');
  errEl.className = 'error-msg';
  errEl.textContent = msg;
  el.parentNode.appendChild(errEl);
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
}

/* ── NEXT STEP ── */
btnNext.addEventListener('click', () => {
  if (!validateStep(currentStep)) {
    scrollToFirstError();
    return;
  }
  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    showStep(currentStep);
    updateProgress();
    updateNavButtons();
    scrollTop();
  }
});

/* ── BACK STEP ── */
btnBack.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateProgress();
    updateNavButtons();
    scrollTop();
  }
});

/* ── SUBMIT ── */
btnSubmit.addEventListener('click', async () => {
  if (!validateStep(6)) return;
  btnSubmit.textContent = 'Sending…';
  btnSubmit.disabled = true;
  try {
    const formData = new FormData(briefForm);
    const res = await fetch(briefForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      window.location.href = 'success.html';
    } else {
      let msg = 'Submission failed. Please try again.';
      try { const data = await res.json(); if (data.errors) msg = data.errors.map(e => e.message).join(', '); } catch {}
      throw new Error(msg);
    }
  } catch (err) {
    btnSubmit.textContent = 'Submit Brief →';
    btnSubmit.disabled = false;
    let errEl = document.getElementById('submit-error');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.id = 'submit-error';
      errEl.className = 'error-msg';
      errEl.style.textAlign = 'center';
      errEl.style.marginTop = '16px';
      btnSubmit.parentNode.appendChild(errEl);
    }
    errEl.textContent = err.message || 'Network error — please check your connection and try again.';
    errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// Allow Enter-key / native submit to trigger the same flow
briefForm.addEventListener('submit', e => {
  e.preventDefault();
  btnSubmit.click();
});

/* ── HELPERS ── */
function scrollTop() {
  window.scrollTo({ top: 64, behavior: 'smooth' });
}

function scrollToFirstError() {
  const first = document.querySelector('.error, .error-msg');
  if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ── FILE UPLOAD ── */
const uploadZone = document.getElementById('upload-zone');
const fileInput  = document.getElementById('references');
const fileList   = document.getElementById('file-list');

if (fileInput) {
  fileInput.addEventListener('change', () => displayFiles(fileInput.files));
}

if (uploadZone) {
  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.classList.add('dragging');
  });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragging'));
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('dragging');
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      displayFiles(e.dataTransfer.files);
    }
  });
}

function displayFiles(files) {
  fileList.innerHTML = '';
  Array.from(files).forEach(file => {
    const entry = document.createElement('div');
    entry.className = 'file-entry';
    entry.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
    fileList.appendChild(entry);
  });
}

/* ── BUILD SUMMARY (Step 6) ── */
function buildSummary() {
  const summaryEl = document.getElementById('summary');
  if (!summaryEl) return;

  const get   = id => (document.getElementById(id) || {}).value || '—';
  const radio = name => { const el = document.querySelector(`input[name="${name}"]:checked`); return el ? el.value : '—'; };
  const checks = name => {
    const els = document.querySelectorAll(`input[name="${name}"]:checked`);
    return els.length ? Array.from(els).map(e => e.value).join(', ') : '—';
  };

  const items = [
    { label: 'Name',             value: get('full-name') },
    { label: 'WhatsApp',         value: get('whatsapp') },
    { label: 'Email',            value: get('email') },
    { label: 'Brand Name',       value: get('brand-name') },
    { label: 'Industry',         value: get('industry') },
    { label: 'Audience',         value: get('ideal-customer'), full: true },
    { label: 'Location',         value: checks('audience-location') },
    { label: 'Vibe',             value: radio('brand-vibe') },
    { label: 'Color Direction',  value: radio('color-direction') },
    { label: 'Goal',             value: radio('project-goal') },
    { label: 'Brand Rating',     value: radio('brand-rating') + ' / 5' },
    { label: 'Services Needed',  value: checks('services-needed'), full: true },
    { label: 'Deadline',         value: radio('deadline') },
    { label: 'Budget',           value: radio('budget') },
  ];

  summaryEl.innerHTML = items.map(item => `
    <div class="summary-item${item.full ? ' full-width' : ''}">
      <span class="s-label">${item.label}</span>
      <span class="s-value">${item.value}</span>
    </div>
  `).join('');
}

/* ── INIT ── */
showStep(1);
updateProgress();
updateNavButtons();
