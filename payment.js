// payment.js

/**
 * Format một số nguyên thành chuỗi có dấu phân cách hàng nghìn
 */
function formatNumberWithCommas(x) {
    if (isNaN(x)) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Kiểm tra đăng nhập
   */
  (function silentRequireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
    }
  })();
  
  /**
   * Khi DOM sẵn sàng
   */
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Hiển thị số tiền hiện tại
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      const rawBalance = 1000000;
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // 2) Đánh dấu nav active
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "payment.html") {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  
    // 3) Bắt sự kiện logout
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
      });
    }
  
    // 4) Chức năng copy số tài khoản
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Hiệu ứng khi copy thành công
          const originalContent = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Đã sao chép';
          this.style.backgroundColor = 'var(--success-color)';
          this.style.borderColor = 'var(--success-color)';
          this.style.color = '#fff';
          
          setTimeout(() => {
            this.innerHTML = originalContent;
            this.style.backgroundColor = '';
            this.style.borderColor = '';
            this.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      });
    });
  
    // 5) Hiệu ứng khi click vào QR code
    const qrWrapper = document.querySelector('.qr-wrapper');
    if (qrWrapper) {
      qrWrapper.addEventListener('click', function() {
        this.classList.toggle('zoom');
        
        if (this.classList.contains('zoom')) {
          this.style.transform = 'scale(1.8)';
          this.style.zIndex = '100';
        } else {
          this.style.transform = '';
          this.style.zIndex = '';
        }
      });
    }
  });