// auth.js

// Hàm đăng nhập (được gọi từ index.html)
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
  
    if (user === 'xinchao' && pass === '123456') {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'home.html';
    } else {
      document.getElementById('error').innerText = 'Sai tài khoản hoặc mật khẩu';
    }
  }
  
  // Hàm kiểm tra đăng nhập (dùng trong home.html và các trang cần bảo vệ)
  function requireLogin() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      alert('Bạn chưa đăng nhập!');
      window.location.href = 'index.html';
    }
  }
  