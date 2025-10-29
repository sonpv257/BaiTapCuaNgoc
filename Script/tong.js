document.addEventListener("DOMContentLoaded", () => {
  function updateProductStats() {
    const rows = document.querySelectorAll(".product-table tbody tr");
    let total = 0;
    let inStock = 0;
    let outStock = 0;

    rows.forEach(row => {
      const status = row.querySelector(".status");
      if (status) {
        total++;
        const text = status.textContent.trim().toLowerCase();
        if (text.includes("còn")) inStock++;
        else if (text.includes("hết")) outStock++;
      }
    });

    // Cập nhật vào HTML
    const totalEl = document.querySelector(".stat-box.total span");
    const inEl = document.querySelector(".stat-box.in-stock span");
    const outEl = document.querySelector(".stat-box.out-stock span");

    if (totalEl) totalEl.textContent = total;
    if (inEl) inEl.textContent = inStock;
    if (outEl) outEl.textContent = outStock;
  }

  // Gọi khi trang load
  updateProductStats();

  // Cho phép gọi lại thủ công nếu bảng thay đổi (xóa, thêm, sửa)
  window.updateProductStats = updateProductStats;
});

document.querySelectorAll(".act[title='Xóa']").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const row = btn.closest("tr");
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      row.remove();
      updateProductStats(); // Cập nhật lại thống kê
    }
  });
});
