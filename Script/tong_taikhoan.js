document.addEventListener("DOMContentLoaded", () => {
  function updateAccountStats() {
    const rows = document.querySelectorAll(".list-table tbody tr"); // hoặc .list-table nếu bạn dùng tên đó
    let total = 0;
    let adminCount = 0;
    let userCount = 0;

    rows.forEach(row => {
      const roleCell = row.cells[3]; // Cột vai trò (thứ 4 trong bảng)
      if (roleCell) {
        total++;
        const role = roleCell.textContent.trim().toLowerCase();
        if (role.includes("admin")) adminCount++;
        else if (role.includes("user")) userCount++;
      }
    });

    // Cập nhật vào giao diện
    const totalEl = document.querySelector(".stat-box.total span");
    const adminEl = document.querySelector(".stat-box.in-stock span");
    const userEl = document.querySelector(".stat-box.out-stock span");

    if (totalEl) totalEl.textContent = total;
    if (adminEl) adminEl.textContent = adminCount;
    if (userEl) userEl.textContent = userCount;
  }

  // Gọi khi trang load
  updateAccountStats();

  // Cho phép gọi lại sau khi sửa / xóa / thêm
  window.updateAccountStats = updateAccountStats;
});
