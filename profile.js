// profile.js

/**
 * Format một số nguyên thành chuỗi có dấu phân cách hàng nghìn,
 * ví dụ: 10000 => "10,000"
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
   * Hàm khởi tạo khi DOM đã sẵn sàng
   */
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Hiển thị số tiền hiện tại
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      const rawBalance = 1350000;
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // 2) Đánh dấu nav "Hồ sơ" thành active
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
  
    // 4) Thêm hiệu ứng cho nút chỉnh sửa
    const editBtn = document.querySelector(".btn-edit-profile");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        alert("Chức năng chỉnh sửa hồ sơ đang được phát triển!");
      });
    }
  
    // 5) Thêm hiệu ứng cho nút xác thực
    const verifyBtn = document.querySelector(".btn-verify");
    if (verifyBtn) {
      verifyBtn.addEventListener("click", () => {
        alert("Bắt đầu quy trình xác thực thông tin!");
      });
    }
  });
