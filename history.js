// history.js

/**
 * Format một số nguyên thành chuỗi có dấu phân cách hàng nghìn,
 * ví dụ: 10000 => "10,000"
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
   *  - Đánh dấu nav "Lịch sử" active
   *  - Bắt sự kiện logout
   *  - Thêm chức năng filter
   */
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Hiển thị số tiền hiện tại
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      // Giả lập số dư 10,000 VNĐ
      const rawBalance = 1350000;
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // 2) Đánh dấu nav "Lịch sử" active
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
    
    // 4) Thêm chức năng filter cho tab
    const filterTabs = document.querySelectorAll(".filter-tab");
    const transactions = document.querySelectorAll(".transaction");
    
    filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // Xóa active class từ tất cả các tab
        filterTabs.forEach(t => t.classList.remove("active"));
        // Thêm active class cho tab hiện tại (sửa lỗi ở đây)
        tab.classList.add("active");
        
        const filter = tab.getAttribute("data-filter");
        
        transactions.forEach(transaction => {
          if (filter === "all") {
            transaction.style.display = "table-row";
          } else if (filter === "income" && transaction.classList.contains("income")) {
            transaction.style.display = "table-row";
          } else if (filter === "expense" && transaction.classList.contains("expense")) {
            transaction.style.display = "table-row";
          } else {
            transaction.style.display = "none";
          }
        });
      });
    });
    
    // 5) Thêm data-label cho các ô trên mobile
    function addDataLabels() {
      const thElements = document.querySelectorAll("th");
      const rows = document.querySelectorAll("tbody tr");
      
      if (window.innerWidth <= 768) {
        rows.forEach(row => {
          const cells = row.querySelectorAll("td");
          cells.forEach((cell, index) => {
            if (thElements[index]) {
              cell.setAttribute("data-label", thElements[index].textContent);
            }
          });
        });
      }
    }
    
    // Gọi hàm khi tải trang
    addDataLabels();
    
    // Gọi lại khi thay đổi kích thước màn hình
    window.addEventListener("resize", addDataLabels);
  });
