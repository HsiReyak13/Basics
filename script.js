const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const progressBar = document.getElementById('progressBar');
    const stepLogin = document.getElementById('stepLogin');
    const stepSignup = document.getElementById('stepSignup');

    // Toggle between login and signup
    loginTab.addEventListener('click', () => {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      loginTab.classList.add('border-blue-500','text-blue-500');
      signupTab.classList.remove('border-blue-500','text-blue-500');
      signupTab.classList.add('text-gray-500');
      progressBar.style.width = "50%";
      stepLogin.classList.add("text-blue-500");
      stepSignup.classList.remove("text-blue-500");
      stepSignup.classList.add("text-gray-400");
    });

    signupTab.addEventListener('click', () => {
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      signupTab.classList.add('border-blue-500','text-blue-500');
      loginTab.classList.remove('border-blue-500','text-blue-500');
      loginTab.classList.add('text-gray-500');
      progressBar.style.width = "100%";
      stepSignup.classList.add("text-blue-500");
      stepLogin.classList.remove("text-blue-500");
      stepLogin.classList.add("text-gray-400");
    });

    // Signup validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupBtn = document.getElementById('signupBtn');

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validateSignup() {
      let valid = true;

      // Email validation
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailInput.value.match(emailPattern)) {
        emailError.classList.remove("hidden");
        valid = false;
      } else {
        emailError.classList.add("hidden");
      }

      // Password validation
      if (passwordInput.value.length < 6) {
        passwordError.classList.remove("hidden");
        valid = false;
      } else {
        passwordError.classList.add("hidden");
      }

      // Confirm password validation
      if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === "") {
        confirmPasswordError.classList.remove("hidden");
        valid = false;
      } else {
        confirmPasswordError.classList.add("hidden");
      }

      signupBtn.disabled = !valid;
      return valid;
    }

    signupForm.addEventListener('input', validateSignup);

    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateSignup()) {
        alert("Sign Up successful!");
        signupForm.reset();
        signupBtn.disabled = true;
      }
    });

    // Login form behavior
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const rememberMe = document.getElementById('rememberMe').checked;
      alert("Login successful! Remember Me: " + rememberMe);
      loginForm.reset();
    });

    // Forgot password link
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
      e.preventDefault();
      alert("Redirecting to Forgot Password page...");
    });
