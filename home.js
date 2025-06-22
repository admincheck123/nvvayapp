// home.js

function formatNumberWithCommas(x) {
    if (isNaN(x)) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function getCurrentBalance() {
    return 1000000;
  }
  
  function animateCards() {
    const cards = document.querySelectorAll(".user-card");
    cards.forEach((card, idx) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, idx * 100);
    });
  }
  
  // Hàm khởi tạo thống kê
  function initStats() {
    const customers = document.querySelectorAll('.user-card').length;
    document.getElementById('total-customers').textContent = customers;
    
    let totalAmount = 0;
    document.querySelectorAll('.user-info').forEach(info => {
      const amountText = info.querySelector('p:nth-child(3)').textContent;
      const amount = parseInt(amountText.replace(/\D/g, ''));
      totalAmount += amount;
    });
    
    document.getElementById('total-amount').textContent = 
      formatNumberWithCommas(totalAmount) + '₫';
    
    const unpaidCount = document.querySelectorAll('.badge-unpaid').length;
    document.getElementById('unpaid-count').textContent = unpaidCount;
  }
  
  // Hàm tìm kiếm
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const cards = document.querySelectorAll('.user-card');
      
      cards.forEach(card => {
        const name = card.querySelector('.user-info p:first-child').textContent.toLowerCase();
        const phone = card.querySelector('.user-info p:nth-child(2)').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || phone.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // Hàm lọc theo trạng thái
  function setupFilter() {
    const statusFilter = document.getElementById('status-filter');
    statusFilter.addEventListener('change', function() {
      const status = this.value;
      const cards = document.querySelectorAll('.user-card');
      
      cards.forEach(card => {
        const badge = card.querySelector('.badge-unpaid') || card.querySelector('.badge-paid');
        
        if (status === 'all' || 
            (status === 'unpaid' && badge.classList.contains('badge-unpaid')) ||
            (status === 'paid' && badge.classList.contains('badge-paid'))) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // Hàm sắp xếp
  function setupSort() {
    const sortSelect = document.getElementById('sort-options');
    sortSelect.addEventListener('change', function() {
      const sortBy = this.value;
      const container = document.querySelector('.cards-container');
      const cards = Array.from(container.querySelectorAll('.user-card'));
      
      cards.sort((a, b) => {
        const amountA = parseInt(a.querySelector('.user-info p:nth-child(3)').textContent.replace(/\D/g, ''));
        const amountB = parseInt(b.querySelector('.user-info p:nth-child(3)').textContent.replace(/\D/g, ''));
        
        switch(sortBy) {
          case 'newest':
            return 0; // Giữ nguyên thứ tự
          case 'oldest':
            return 0; // Giữ nguyên thứ tự
          case 'amount-high':
            return amountB - amountA;
          case 'amount-low':
            return amountA - amountB;
          default:
            return 0;
        }
      });
      
      // Xóa card hiện tại và thêm lại theo thứ tự mới
      container.innerHTML = '';
      cards.forEach(card => container.appendChild(card));
      
      // Kích hoạt lại animation
      animateCards();
    });
  }
  
  // Hàm thêm khách hàng
  function setupAddCustomer() {
    const btnAdd = document.getElementById('btnAddCustomer');
    btnAdd.addEventListener('click', function() {
      alert('Tính năng thêm khách hàng mới sẽ được mở ở đây!');
      // Trong thực tế: Mở modal hoặc chuyển hướng trang
    });
  }
  
  // Hàm xử lý hành động trên card
  function setupCardActions() {
    document.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.user-card');
        const name = card.querySelector('.user-info p:first-child').textContent;
        alert(`Xem chi tiết khách hàng: ${name.split(':')[1].trim()}`);
      });
    });
    
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.user-card');
        const name = card.querySelector('.user-info p:first-child').textContent;
        alert(`Chỉnh sửa thông tin: ${name.split(':')[1].trim()}`);
      });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.user-card');
        const name = card.querySelector('.user-info p:first-child').textContent;
        
        if (confirm(`Bạn có chắc muốn xóa ${name.split(':')[1].trim()} khỏi hệ thống?`)) {
          card.style.opacity = '0';
          card.style.transform = 'translateX(-100px)';
          setTimeout(() => card.remove(), 300);
        }
      });
    });
  }
  
  (function silentRequireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
    }
  })();
  
  document.addEventListener("DOMContentLoaded", () => {
    // Hiển thị số tiền
    const balanceSpan = document.getElementById("current-balance");
    if (balanceSpan) {
      const rawBalance = getCurrentBalance();
      const formatted = formatNumberWithCommas(rawBalance) + " VNĐ";
      balanceSpan.innerText = formatted;
    }
  
    // Kích hoạt hiệu ứng fade-in cho cards
    animateCards();
  
    // Đánh dấu nav "Trang chủ"
    document.querySelectorAll(".nav a").forEach(link => {
      if (link.textContent.trim() === "Trang chủ") {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  
    // Logout
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
      });
    }
    
    // Khởi tạo các chức năng mới
    initStats();
    setupSearch();
    setupFilter();
    setupSort();
    setupAddCustomer();
    setupCardActions();
  });