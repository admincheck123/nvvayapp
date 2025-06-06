// history.js

/**
 * Format một số nguyên thành chuỗi có dấu phân cách hàng nghìn,
 * ví dụ: 10000 => "10,000"
 * (Dùng lại nếu cần)
 */
function formatNumberWithCommas(x) {
    if (isNaN(x)) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Kiểm tra đăng nhập một lần nữa (phòng khi script head bị disable).
   */
  (function silentRequireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
    }
  })();
  
  /**
   * Khi DOM sẵn sàng:
   *  - Hiển thị số tiền hiện tại
   *  - Đánh dấu nav “Lịch sử” active
   *  - Bắt sự kiện logout
   */
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Hiển thị số tiền hiện tại
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      // Giả lập số dư 10,000 VNĐ
      const rawBalance = 0;
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // 2) Đánh dấu nav “Lịch sử” active
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "history.html") {
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
  });
  