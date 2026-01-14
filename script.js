// ============================================
// ELEMENT REFERENCES
// ============================================
const landing = document.getElementById("landing");
const auth = document.getElementById("auth");
const modal = document.getElementById("signupModal");
const openBtn = document.getElementById("openSignup");
const closeBtn = document.getElementById("closeSignup");
const toast = document.getElementById("toast");

// Form elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Stepper elements
const steps = document.querySelectorAll(".step");
const stepLines = document.querySelectorAll(".step-line");
const contents = document.querySelectorAll(".step-content");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const registerBtn = document.getElementById("registerBtn");
const title = document.getElementById("signupTitle");

// Mobile menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// ============================================
// STATE MANAGEMENT
// ============================================
let currentStep = 0;
const stepTitles = [
  "Step 1: Terms & Conditions",
  "Step 2: Personal Information",
  "Step 3: Account Security",
  "Step 4: Confirmation"
];

const stepDescriptions = [
  "Please read and agree to our terms and conditions.",
  "Join the IV of Spades community and get exclusive access.",
  "Create a secure password for your account.",
  "Review your information and complete registration."
];

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function showAuth() {
  landing.classList.add("hidden");
  auth.classList.remove("hidden");
  // Close mobile menu if open
  mobileMenu.classList.add("hidden");
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLanding() {
  auth.classList.add("hidden");
  landing.classList.remove("hidden");
  modal.classList.add("hidden");
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToFeatures() {
  const features = document.getElementById("features");
  features.scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  mobileMenuBtn.setAttribute("aria-expanded", "false");
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  if (menuIcon) menuIcon.classList.remove('hidden');
  if (closeIcon) closeIcon.classList.add('hidden');
}

// ============================================
// MOBILE MENU
// ============================================
mobileMenuBtn.addEventListener("click", () => {
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  
  mobileMenu.classList.toggle("hidden");
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  
  if (!isExpanded) {
    // Opening menu
    if (menuIcon) menuIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
  } else {
    // Closing menu
    if (menuIcon) menuIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }
});

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================
function showToast(type, title, message) {
  const toastEl = document.getElementById("toast");
  const toastIcon = document.getElementById("toastIcon");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  const toastContainer = toastEl.querySelector("div");

  // Define icons and colors for different types
  const configs = {
    success: {
      icon: `<svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>`,
      borderColor: "border-green-500"
    },
    error: {
      icon: `<svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>`,
      borderColor: "border-red-500"
    },
    warning: {
      icon: `<svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`,
      borderColor: "border-yellow-500"
    },
    info: {
      icon: `<svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
      </svg>`,
      borderColor: "border-blue-500"
    }
  };

  const config = configs[type] || configs.info;

  // Update toast content
  toastIcon.innerHTML = config.icon;
  toastTitle.textContent = title;
  toastMessage.textContent = message;

  // Remove old border colors and add new one
  toastContainer.className = toastContainer.className.replace(/border-\w+-\d+/g, '');
  toastContainer.classList.add(config.borderColor);

  // Show toast
  toastEl.classList.remove("hidden");

  // Auto-hide after 4 seconds
  setTimeout(() => {
    hideToast();
  }, 4000);
}

function hideToast() {
  toast.classList.add("hidden");
}

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// ============================================
// PHONE NUMBER FORMATTING
// ============================================
function formatPhilippinePhone(phone) {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+63')) {
    // International format: +63 9XX XXX XXXX
    const digits = cleaned.substring(3);
    if (digits.length === 10) {
      return `+63 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
    }
  } else if (cleaned.startsWith('0')) {
    // Local format: 09XX XXX XXXX or 0X XXX XXXX
    if (cleaned.length === 11) {
      if (cleaned[1] === '9') {
        // Mobile: 09XX XXX XXXX
        return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
      } else {
        // Landline: 0X XXX XXXX
        return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
      }
    }
  } else if (cleaned.startsWith('9') && cleaned.length === 10) {
    // Mobile without leading 0: 9XX XXX XXXX
    return `09${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
  }
  
  // Return original if formatting fails
  return phone;
}

// ============================================
// PASSWORD STRENGTH INDICATOR
// ============================================
function checkPasswordStrength(password) {
  let strength = 0;
  const indicators = ['strength1', 'strength2', 'strength3', 'strength4'];
  const strengthText = document.getElementById('strengthText');

  // Reset
  indicators.forEach(id => {
    document.getElementById(id).className = 'h-1 flex-1 bg-gray-200 rounded transition-colors';
  });

  if (password.length === 0) {
    strengthText.textContent = '';
    return;
  }

  // Check length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Check for mixed case
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

  // Check for numbers and special characters
  if (/\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  const colors = ['bg-red-600', 'bg-red-500', 'bg-orange-500', 'bg-red-400'];
  const texts = ['Weak', 'Fair', 'Good', 'Strong'];

  for (let i = 0; i < strength; i++) {
    document.getElementById(indicators[i]).className = `h-1 flex-1 ${colors[strength - 1]} rounded transition-colors`;
  }

  strengthText.textContent = `Password strength: ${texts[strength - 1] || ''}`;
  strengthText.className = `text-xs ${strength > 2 ? 'text-green-600' : strength > 1 ? 'text-yellow-600' : 'text-red-600'}`;
}

// Add event listener for password strength
document.addEventListener('DOMContentLoaded', () => {
  const signupPasswordInput = document.getElementById('signupPassword');
  if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', (e) => {
      checkPasswordStrength(e.target.value);
    });
  }
});

// ============================================
// STEPPER NAVIGATION
// ============================================
function updateStepper() {
  // Update step indicators
  steps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  // Update step lines
  stepLines.forEach((line, index) => {
    if (index < currentStep) {
      line.classList.add("active");
    } else {
      line.classList.remove("active");
    }
  });

  // Update content visibility
  contents.forEach((content, index) => {
    content.classList.toggle("hidden", index !== currentStep);
  });

  // Update title and description
  title.textContent = stepTitles[currentStep];
  const description = document.querySelector("#signupModal p");
  if (description) {
    description.textContent = stepDescriptions[currentStep];
  }

  // Update button visibility
  prevBtn.classList.toggle("hidden", currentStep === 0);
  nextBtn.classList.toggle("hidden", currentStep === steps.length - 1);
  registerBtn.classList.toggle("hidden", currentStep !== steps.length - 1);

  // Update progress bar aria attribute
  const progressBar = document.querySelector('[role="progressbar"]');
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', currentStep + 1);
  }

  // Focus appropriate field when step changes
  setTimeout(() => {
    if (currentStep === 1) {
      // Focus username field when entering personal info step
      const usernameField = document.getElementById('signupUsername');
      if (usernameField) usernameField.focus();
    } else if (currentStep === 0) {
      // Focus terms checkbox when on terms step
      const termsCheckbox = document.getElementById('termsCheckbox');
      if (termsCheckbox) termsCheckbox.focus();
    }
  }, 100);

  // On step 4 (confirmation), populate review data
  if (currentStep === 3) {
    const username = document.getElementById('signupUsername').value;
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const dob = document.getElementById('signupDateOfBirth').value;
    
    document.getElementById('reviewUsername').textContent = username;
    document.getElementById('reviewFirstName').textContent = firstName;
    document.getElementById('reviewLastName').textContent = lastName;
    document.getElementById('reviewEmail').textContent = email;
    
    // Show phone if provided
    const phoneContainer = document.getElementById('reviewPhoneContainer');
    const reviewPhone = document.getElementById('reviewPhone');
    if (phone.trim()) {
      reviewPhone.textContent = formatPhilippinePhone(phone);
      phoneContainer.classList.remove('hidden');
    } else {
      phoneContainer.classList.add('hidden');
    }
    
    // Show date of birth if provided
    const dobContainer = document.getElementById('reviewDobContainer');
    const reviewDob = document.getElementById('reviewDob');
    if (dob) {
      const dateObj = new Date(dob);
      const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      reviewDob.textContent = formattedDate;
      dobContainer.classList.remove('hidden');
    } else {
      dobContainer.classList.add('hidden');
    }
  }
}

// ============================================
// FORM VALIDATION
// ============================================
function validateStep(step) {
  let isValid = true;

  if (step === 0) {
    // Validate terms checkbox
    const termsCheckbox = document.getElementById('termsCheckbox');
    if (!termsCheckbox.checked) {
      showToast('error', 'Terms Required', 'Please agree to the Terms of Service and Privacy Policy to continue.');
      isValid = false;
    }
  }

  if (step === 1) {
    // Validate username
    const username = document.getElementById('signupUsername');
    const usernameError = document.getElementById('usernameError');
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernamePattern.test(username.value.trim())) {
      username.classList.add('input-error');
      usernameError.classList.remove('hidden');
      isValid = false;
    } else {
      username.classList.remove('input-error');
      usernameError.classList.add('hidden');
    }

    // Validate first name
    const firstName = document.getElementById('signupFirstName');
    const firstNameError = document.getElementById('firstNameError');
    if (firstName.value.trim().length < 2) {
      firstName.classList.add('input-error');
      firstNameError.classList.remove('hidden');
      isValid = false;
    } else {
      firstName.classList.remove('input-error');
      firstNameError.classList.add('hidden');
    }

    // Validate last name
    const lastName = document.getElementById('signupLastName');
    const lastNameError = document.getElementById('lastNameError');
    if (lastName.value.trim().length < 2) {
      lastName.classList.add('input-error');
      lastNameError.classList.remove('hidden');
      isValid = false;
    } else {
      lastName.classList.remove('input-error');
      lastNameError.classList.add('hidden');
    }

    // Validate email
    const email = document.getElementById('signupEmail');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      email.classList.add('input-error');
      emailError.classList.remove('hidden');
      isValid = false;
    } else {
      email.classList.remove('input-error');
      emailError.classList.add('hidden');
    }

    // Validate phone (optional but if provided, should be valid Philippine number)
    const phone = document.getElementById('signupPhone');
    const phoneError = document.getElementById('phoneError');
    if (phone.value.trim() && phone.value.trim().length > 0) {
      // Remove spaces, dashes, parentheses for validation
      const cleanedPhone = phone.value.replace(/\s|\-|\(|\)/g, '');
      
      // Philippine phone number validation
      // Formats accepted:
      // - +63XXXXXXXXXX (11 digits after +63, mobile starts with 9)
      // - 09XXXXXXXXX (11 digits, mobile starts with 09)
      // - 9XXXXXXXXXX (10 digits, mobile starts with 9)
      // - +63XXXXXXXXX (10 digits after +63, landline)
      // - 0XXXXXXXXXX (11 digits, landline starts with 02-08)
      
      let isValidPhone = false;
      
      if (cleanedPhone.startsWith('+63')) {
        // International format with country code
        const digits = cleanedPhone.substring(3); // Remove +63
        if (digits.length === 10 && /^\d{10}$/.test(digits)) {
          // Mobile: starts with 9, Landline: starts with 2-8
          if (digits[0] >= '2' && digits[0] <= '9') {
            isValidPhone = true;
          }
        }
      } else if (cleanedPhone.startsWith('0')) {
        // Local format with leading 0
        if (cleanedPhone.length === 11 && /^\d{11}$/.test(cleanedPhone)) {
          // Mobile: starts with 09, Landline: starts with 02-08
          if (cleanedPhone[1] >= '2' && cleanedPhone[1] <= '9') {
            isValidPhone = true;
          }
        }
      } else if (cleanedPhone.startsWith('9')) {
        // Mobile without country code or leading 0
        if (cleanedPhone.length === 10 && /^\d{10}$/.test(cleanedPhone)) {
          isValidPhone = true;
        }
      }
      
      if (!isValidPhone) {
        phone.classList.add('input-error');
        phoneError.classList.remove('hidden');
        isValid = false;
      } else {
        phone.classList.remove('input-error');
        phoneError.classList.add('hidden');
      }
    } else {
      phone.classList.remove('input-error');
      phoneError.classList.add('hidden');
    }

    // Validate date of birth (optional but if provided, should be valid and not future)
    const dob = document.getElementById('signupDateOfBirth');
    const dobError = document.getElementById('dobError');
    if (dob.value) {
      const selectedDate = new Date(dob.value);
      const today = new Date();
      if (selectedDate > today) {
        dob.classList.add('input-error');
        dobError.classList.remove('hidden');
        isValid = false;
      } else {
        dob.classList.remove('input-error');
        dobError.classList.add('hidden');
      }
    } else {
      dob.classList.remove('input-error');
      dobError.classList.add('hidden');
    }
  }

  if (step === 2) {
    // Validate password
    const password = document.getElementById('signupPassword');
    const passwordError = document.getElementById('passwordError');
    if (password.value.length < 8) {
      password.classList.add('input-error');
      passwordError.classList.remove('hidden');
      isValid = false;
    } else {
      password.classList.remove('input-error');
      passwordError.classList.add('hidden');
    }

    // Validate confirm password
    const confirmPassword = document.getElementById('signupConfirmPassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (confirmPassword.value !== password.value) {
      confirmPassword.classList.add('input-error');
      confirmPasswordError.classList.remove('hidden');
      isValid = false;
    } else {
      confirmPassword.classList.remove('input-error');
      confirmPasswordError.classList.add('hidden');
    }
  }

  return isValid;
}

// ============================================
// MODAL CONTROLS
// ============================================
openBtn.addEventListener('click', () => {
  modal.classList.remove("hidden");
  currentStep = 0;
  updateStepper();
  // Focus terms checkbox
  setTimeout(() => {
    document.getElementById('termsCheckbox').focus();
  }, 100);
});

closeBtn.addEventListener('click', () => {
  modal.classList.add("hidden");
  signupForm.reset();
  currentStep = 0;
  // Clear all error messages
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  document.querySelectorAll('[id$="Error"]').forEach(el => el.classList.add('hidden'));
  checkPasswordStrength('');
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeBtn.click();
  }
});

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeBtn.click();
  }
});

// ============================================
// STEPPER BUTTON HANDLERS
// ============================================
nextBtn.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStepper();
      
      // Focus first input of next step
      setTimeout(() => {
        const nextStepInput = contents[currentStep].querySelector('input');
        if (nextStepInput) nextStepInput.focus();
      }, 100);
    }
  } else {
    showToast('error', 'Validation Error', 'Please fill in all required fields correctly.');
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateStepper();
  }
});

// ============================================
// FORM SUBMISSIONS
// ============================================

// Login Form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btnText = document.getElementById('loginBtnText');
  const spinner = document.getElementById('loginSpinner');
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  
  // Show loading state
  btnText.textContent = 'Signing in...';
  spinner.classList.remove('hidden');
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    const email = document.getElementById('loginEmail').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    showToast('success', 'Welcome Back!', `You're now signed in to IV of Spades.`);
    
    // Reset form
    loginForm.reset();
    
    // Reset button state
    btnText.textContent = 'Sign in';
    spinner.classList.add('hidden');
    submitBtn.disabled = false;
    
    // Optional: Navigate to dashboard or home
    setTimeout(() => {
      showLanding();
    }, 1500);
  }, 1500);
});

// Signup Form
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Terms checkbox is already validated in step 0, so we don't need to check it again here
  
  const btnText = document.getElementById('registerBtnText');
  const spinner = document.getElementById('registerSpinner');
  const submitBtn = registerBtn;
  
  // Show loading state
  btnText.textContent = 'Creating account...';
  spinner.classList.remove('hidden');
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    const username = document.getElementById('signupUsername').value;
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const dob = document.getElementById('signupDateOfBirth').value;
    
    // Prepare form data for production
    const formData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone || null,
      dateOfBirth: dob || null,
      password: document.getElementById('signupPassword').value
    };
    
    // Log form data (in production, this would be sent to your API)
    console.log('Form Data:', formData);
    
    showToast('success', 'Welcome to IV of Spades!', `Welcome ${firstName}! Your account has been created successfully.`);
    
    // Reset form and modal
    signupForm.reset();
    currentStep = 0;
    updateStepper();
    checkPasswordStrength('');
    
    // Reset button state
    btnText.textContent = 'Register';
    spinner.classList.add('hidden');
    submitBtn.disabled = false;
    
    // Close modal
    setTimeout(() => {
      modal.classList.add("hidden");
      // Optionally show auth page or navigate
      showAuth();
    }, 1500);
  }, 2000);
});

// ============================================
// FORGOT PASSWORD
// ============================================
function showForgotPassword(event) {
  event.preventDefault();
  showToast('info', 'Password Reset', 'A password reset link will be sent to your email address.');
}

// ============================================
// INITIALIZE
// ============================================
updateStepper();

// Add smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class when scrolling down
  if (currentScroll > 50) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
  
  // Close mobile menu on scroll
  if (!mobileMenu.classList.contains('hidden')) {
    closeMobileMenu();
  }
  
  lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    if (!mobileMenu.classList.contains('hidden')) {
      closeMobileMenu();
    }
  }
});

// Active navigation link highlighting based on scroll position
const sections = ['landing', 'features', 'auth', 'footer'];
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = section;
      }
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);
// Initial update
updateActiveNavLink();

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('#features > div').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

// Log welcome message
console.log('%c🎵 Welcome to IV of Spades!', 'color: #CC0000; font-size: 20px; font-weight: bold;');
console.log('%cExperience the retro-funk sound!', 'color: #6b7280; font-size: 14px;');
