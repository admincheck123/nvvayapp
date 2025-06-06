// profile.js

/**
 * Format một số nguyên thành chuỗi có dấu phân cách hàng nghìn,
 * ví dụ: 10000 => "10,000"
 * (dùng lại nếu cần)
 */
function formatNumberWithCommas(x) {
    if (isNaN(x)) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Lặp lại kiểm tra một lần nữa trong profile.js để phòng trường hợp dùng DevTools disable script head.
   */
  (function silentRequireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
    }
  })();
  
  /**
   * Hàm khởi tạo khi DOM đã sẵn sàng:
   *  - Hiển thị số tiền hiện tại
   *  - Đánh dấu nav “Hồ sơ” thành active
   *  - Bắt sự kiện logout
   */
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Hiển thị số tiền hiện tại (nếu muốn giống Home)
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      const rawBalance = 0;
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // 2) Đánh dấu nav “Hồ sơ” thành active
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
      if (link.textContent.trim() === "Hồ sơ") {
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
  