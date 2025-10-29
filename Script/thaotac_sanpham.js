// ==================== XEM SẢN PHẨM ====================
document.addEventListener("DOMContentLoaded", () => {
    const dialogView = document.getElementById("dialogView");
    const closeBtns = dialogView.querySelectorAll(".close-btn");

    document.querySelectorAll(".actions-cell .fa-eye").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");

            // Lấy dữ liệu
            const images = Array.from(row.querySelectorAll(".prod img")).map(
                (img) => img.src
            );
            const name = row.cells[2].textContent.trim();
            const price = row.cells[3].textContent.trim();
            const desc = row.cells[4].textContent.trim();
            const date = row.cells[5].textContent.trim();
            const status = row.cells[6].innerText.trim();

            // Gán vào dialog
            document.getElementById("viewImages").innerHTML = images
                .map((src) => `<img src="${src}" alt="">`)
                .join("");
            document.getElementById("viewName").textContent = name;
            document.getElementById("viewPrice").textContent = price;
            document.getElementById("viewDesc").textContent = desc;
            document.getElementById("viewDate").textContent = date;
            document.getElementById("viewStatus").textContent = status;

            dialogView.classList.add("active");
        });
    });

    closeBtns.forEach((btn) =>
        btn.addEventListener("click", () =>
            dialogView.classList.remove("active")
        )
    );

    dialogView.addEventListener("click", (e) => {
        if (e.target === dialogView) dialogView.classList.remove("active");
    });
});

// ==================== SỬA SẢN PHẨM ====================
document.addEventListener("DOMContentLoaded", () => {
    let currentRow = null;
    const dialogEdit = document.getElementById("dialogEdit");
    const editForm = document.getElementById("editForm");
    const imageInput = document.getElementById("editImageInput");
    const imgContainer = document.getElementById("editImages");

    // Khi nhấn "Sửa"
    document.querySelectorAll(".fa-pen-to-square").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            currentRow = e.target.closest("tr");

            // Hiển thị ảnh hiện tại
            const imgs = currentRow.querySelectorAll(".prod img");
            imgContainer.innerHTML = Array.from(imgs)
                .map((img) => `<img src="${img.src}" alt="">`)
                .join("");

            // Đổ dữ liệu vào form
            document.getElementById("editName").value = currentRow.cells[2].textContent.trim();
            document.getElementById("editPrice").value = currentRow.cells[3].textContent.trim();
            document.getElementById("editDesc").value = currentRow.cells[4].textContent.trim();
            document.getElementById("editDate").value = currentRow.cells[5].textContent.trim();
            document.getElementById("editStatus").value = currentRow.cells[6].innerText.trim();

            dialogEdit.classList.add("active");
        });
    });

    // Xem trước ảnh khi chọn mới
    imageInput.addEventListener("change", (e) => {
        const files = e.target.files;
        imgContainer.innerHTML = "";
        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.createElement("img");
                img.src = ev.target.result;
                imgContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });

    // Lưu thay đổi
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!currentRow) return;

        const name = document.getElementById("editName").value.trim();
        const price = document.getElementById("editPrice").value.trim();
        const desc = document.getElementById("editDesc").value.trim();
        const status = document.getElementById("editStatus").value.trim();

        // Cập nhật bảng
        currentRow.cells[2].textContent = name;
        currentRow.cells[3].textContent = price;
        currentRow.cells[4].textContent = desc;
        currentRow.cells[6].innerHTML =
            status === "Còn hàng"
                ? `<span class="status active">Còn hàng</span>`
                : `<span class="status inactive">Hết hàng</span>`;

        // Cập nhật ảnh mới nếu có
        const newImgs = imgContainer.querySelectorAll("img");
        const imgCell = currentRow.querySelector(".prod");
        if (newImgs.length > 0) {
            imgCell.innerHTML = "";
            newImgs.forEach((img) => {
                const clone = document.createElement("img");
                clone.src = img.src;
                imgCell.appendChild(clone);
            });
        }

        if (window.updateProductStats) updateProductStats();// Cập nhật lại thống kê
        // Hiện alert
        showAlert(`✅ Đã lưu thay đổi cho "${name}"!`);
        closeEditDialog();
    });

    // Đóng dialog
    function closeEditDialog() {
        dialogEdit.classList.remove("active");
        imageInput.value = "";
    }

    document.querySelectorAll(".close-edit").forEach((btn) =>
        btn.addEventListener("click", closeEditDialog)
    );

    dialogEdit.addEventListener("click", (e) => {
        if (e.target.id === "dialogEdit") closeEditDialog();
    });
});

// ==================== XÓA SẢN PHẨM ====================
let deleteRow = null;
let deleteName = "";

document.querySelectorAll(".act[title='Xóa']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const row = btn.closest("tr");
        deleteName = row.cells[2].textContent.trim();
        deleteRow = row;

        document.getElementById("deleteName").textContent = deleteName;
        document.getElementById("dialogDelete").classList.add("active");
    });
});

document.getElementById("confirmDelete").addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        closeDeleteDialog();

        if (window.updateProductStats) updateProductStats();// Cập nhật lại thống kê
        
        showAlert(`✅ Đã xóa sản phẩm ${deleteName}!`);
    }
});

function closeDeleteDialog() {
    document.getElementById("dialogDelete").classList.remove("active");
}

// Nút đóng dialog
document.querySelectorAll(".close-delete").forEach((btn) =>
    btn.addEventListener("click", closeDeleteDialog)
);

// Đóng dialog khi click ra ngoài
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
