// auth.js

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
  });
  
  // Form submission
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    login();
  });
  
  // Login function
  function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorElement = document.getElementById('error');
    
    // Clear previous error
    errorElement.innerText = '';
    
    // Simple validation
    if (!user || !pass) {
      errorElement.innerText = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }
    
    // Check credentials
    if (user === 'nvkhangcd0909' && pass === '2009@cdkhang!') {
      // Show loading state
      const loginBtn = document.querySelector('.login-btn');
      const originalContent = loginBtn.innerHTML;
      loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
      loginBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'home.html';
      }, 1500);
    } else {
      errorElement.innerText = 'Sai tài khoản hoặc mật khẩu';
      
      // Add error animation
      const form = document.getElementById('loginForm');
      form.classList.add('shake');
      setTimeout(() => {
        form.classList.remove('shake');
      }, 500);
    }
  }
  
  // Hàm kiểm tra đăng nhập (dùng trong home.html và các trang cần bảo vệ)
  function requireLogin() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      alert('Bạn chưa đăng nhập!');
      window.location.href = 'index.html';
    }
  }