// ==================== XEM TÀI KHOẢN ====================
document.addEventListener("DOMContentLoaded", () => {
    const dialogView = document.getElementById("dialogView");
    const closeBtns = dialogView.querySelectorAll(".close-btn");

    document.querySelectorAll(".actions-cell .fa-eye").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");

            // Lấy dữ liệu từ các cột
            const fullName = row.cells[1].textContent.trim();
            const username = row.cells[2].textContent.trim();
            const role = row.cells[3].textContent.trim();
            const email = row.cells[4].textContent.trim();
            const phone = row.cells[5].textContent.trim();
            const date = row.cells[6].textContent.trim();

            // Gán vào dialog
            document.getElementById("viewFullName").textContent = fullName;
            document.getElementById("viewUsername").textContent = username;
            document.getElementById("viewRole").textContent = role;
            document.getElementById("viewEmail").textContent = email;
            document.getElementById("viewPhone").textContent = phone;
            document.getElementById("viewDate").textContent = date;

            dialogView.classList.add("active");
        });
    });

    closeBtns.forEach((btn) =>
        btn.addEventListener("click", () => dialogView.classList.remove("active"))
    );

    dialogView.addEventListener("click", (e) => {
        if (e.target === dialogView) dialogView.classList.remove("active");
    });
});

// ==================== SỬA TÀI KHOẢN ====================
document.addEventListener("DOMContentLoaded", () => {
    let currentRow = null;
    const dialogEdit = document.getElementById("dialogEdit");
    const editForm = document.getElementById("editForm");

    // Khi nhấn "Sửa"
    document.querySelectorAll(".fa-pen-to-square").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            currentRow = e.target.closest("tr");

            document.getElementById("editFullName").value = currentRow.cells[1].textContent.trim();
            document.getElementById("editUsername").value = currentRow.cells[2].textContent.trim();
            document.getElementById("editRole").value = currentRow.cells[3].textContent.trim().toLowerCase();
            document.getElementById("editEmail").value = currentRow.cells[4].textContent.trim();
            document.getElementById("editPhone").value = currentRow.cells[5].textContent.trim();
            document.getElementById("editDate").value = currentRow.cells[6].textContent.trim();

            dialogEdit.classList.add("active");
        });
    });

    // Lưu thay đổi
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!currentRow) return;

        const fullName = document.getElementById("editFullName").value.trim();
        const role = document.getElementById("editRole").value.trim();
        const email = document.getElementById("editEmail").value.trim();
        const phone = document.getElementById("editPhone").value.trim();

        // Cập nhật bảng
        currentRow.cells[1].textContent = fullName;
        currentRow.cells[3].textContent = role;
        currentRow.cells[4].textContent = email;
        currentRow.cells[5].textContent = phone;

        // Cập nhật lại thống kê
        if (window.updateAccountStats) updateAccountStats();

        showAlert(`✅ Đã lưu thay đổi cho tài khoản "${fullName}"!`);// Cập nhật lại thống kê
        closeEditDialog();
    });

    // Đóng dialog
    function closeEditDialog() {
        dialogEdit.classList.remove("active");
    }

    document.querySelectorAll(".close-edit").forEach((btn) =>
        btn.addEventListener("click", closeEditDialog)
    );

    dialogEdit.addEventListener("click", (e) => {
        if (e.target.id === "dialogEdit") closeEditDialog();
    });
});

// ==================== XÓA TÀI KHOẢN ====================
let deleteRow = null;
let deleteName = "";

document.querySelectorAll(".act[title='Xóa']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const row = btn.closest("tr");
        deleteName = row.cells[1].textContent.trim();
        deleteRow = row;

        document.getElementById("deleteName").textContent = deleteName;
        document.getElementById("dialogDelete").classList.add("active");
    });
});

document.getElementById("confirmDelete").addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        closeDeleteDialog();

        if (window.updateAccountStats) updateAccountStats();// Cập nhật lại thống kê
        showAlert(`✅ Đã xóa tài khoản "${deleteName}"!`);
    }
});

function closeDeleteDialog() {
    document.getElementById("dialogDelete").classList.remove("active");
}

document.querySelectorAll(".close-delete").forEach((btn) =>
    btn.addEventListener("click", closeDeleteDialog)
);

document.getElementById("dialogDelete").addEventListener("click", (e) => {
    if (e.target.id === "dialogDelete") closeDeleteDialog();
});

// ==================== ALERT BOX ====================
function showAlert(text) {
    const alertBox = document.getElementById("alertBox");
    if (!alertBox) return;

    alertBox.textContent = text;
    alertBox.classList.add("show");
    setTimeout(() => alertBox.classList.remove("show"), 2500);
}
