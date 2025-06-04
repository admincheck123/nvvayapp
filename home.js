// home.js

/**
 * Format một số nguyên thành chuỗi có dấu phân cách hàng nghìn,
 * ví dụ: 10000 => "10,000"
 */
function formatNumberWithCommas(x) {
    if (isNaN(x)) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Giả lập hoặc lấy số tiền hiện tại của user (từ server, localStorage…).
   * Ở đây tạm hardcode thành 10000, có thể thay bằng fetch API nếu cần.
   */
  function getCurrentBalance() {
    return -10250000;
  }
  
  /**
   * Thêm class “visible” vào từng .user-card với hiệu ứng delay để fade-in tuần tự
   */
  function animateCards() {
    const cards = document.querySelectorAll(".user-card");
    cards.forEach((card, idx) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, idx * 100);
    });
  }
  
  /**
   * Hàm gọi ngay khi file JS được load: kiểm tra trạng thái đăng nhập
   * Nếu chưa đăng nhập, redirect về index.html ngay lập tức (không hiện thông báo).
   */
  (function silentRequireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
    }
  })();
  
  /**
   * Sau khi DOM đã sẵn sàng:
   *  - Cập nhật số tiền vào DOM
   *  - Kích hoạt animation cho cards
   *  - Đánh dấu nav “Trang chủ” thành active
   *  - Gắn sự kiện logout cho nút
   */
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Hiển thị số tiền hiện tại
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      const rawBalance = getCurrentBalance();
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // 2) Kích hoạt hiệu ứng fade-in cho cards
    animateCards();
  
    // 3) Đánh dấu nav “Trang chủ” thành active
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
      if (link.textContent.trim() === "Trang chủ") {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  
    // 4) Bắt sự kiện logout
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        // Xóa flag đăng nhập rồi redirect về index.html
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
      });
    }
  });
  